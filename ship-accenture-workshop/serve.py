#!/usr/bin/env python3
"""Static file server for the workshop deck — same behaviour as
`python3 -m http.server`, PLUS a POST /api/save-note endpoint that writes
speaker-note edits from the presenter view back into slide-manifest.js.

Usage:  python3 serve.py [port]        (default port 8000)

Run it from the SAME folder you used for `python3 -m http.server`
(i.e. the ship-accenture-workshop directory). The first time a given
manifest is edited, a one-time pristine backup is written next to it as
slide-manifest.js.bak.
"""
import sys, os, json, re, http.server, socketserver
from urllib.parse import unquote

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.getcwd()


def js_escape(s):
    """Turn a Python string into a JS double-quoted string literal."""
    s = s.replace('\\', '\\\\').replace('"', '\\"')
    s = s.replace('\r\n', '\n').replace('\r', '\n').replace('\n', '\\n')
    return '"' + s + '"'


def resolve_under_root(url_path):
    """Resolve a URL path to an absolute file path, refusing to escape ROOT."""
    rel = unquote(url_path or '').lstrip('/')
    full = os.path.normpath(os.path.join(ROOT, rel))
    if full != ROOT and not full.startswith(ROOT + os.sep):
        return None
    return full


class Handler(http.server.SimpleHTTPRequestHandler):
    def _json(self, code, obj):
        body = json.dumps(obj).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        if self.path != '/api/save-note':
            self._json(404, {'error': 'unknown endpoint'})
            return
        try:
            length = int(self.headers.get('Content-Length', 0))
            data = json.loads(self.rfile.read(length) or b'{}')
            slide_c = data['c']
            notes = data['notes']
            manifest_rel = data.get('manifest', '')
        except Exception as e:
            self._json(400, {'error': 'bad request: %s' % e})
            return

        if not isinstance(slide_c, str) or not re.fullmatch(r'[A-Za-z0-9_]+', slide_c):
            self._json(400, {'error': 'invalid slide id'})
            return
        if not isinstance(notes, str):
            self._json(400, {'error': 'notes must be a string'})
            return

        manifest = resolve_under_root(manifest_rel)
        if (not manifest or os.path.basename(manifest) != 'slide-manifest.js'
                or not os.path.isfile(manifest)):
            self._json(400, {'error': 'invalid manifest path'})
            return

        with open(manifest, 'r', encoding='utf-8') as f:
            content = f.read()

        # Match  c: 'Slide_X' ... notes: "<js string>"  — the closing quote on
        # the id anchors it so Slide_Section1 never matches Slide_Section101,
        # and the lazy .*? stops at the first notes: inside the same object.
        pattern = re.compile(
            r"(c:\s*'" + re.escape(slide_c) + r"'.*?notes:\s*)" + r'"(?:[^"\\]|\\.)*"',
            re.DOTALL)
        new_str = js_escape(notes)
        new_content, n = pattern.subn(lambda m: m.group(1) + new_str, content, count=1)
        if n == 0:
            self._json(404, {'error': 'slide %s or its notes field not found' % slide_c})
            return

        bak = manifest + '.bak'
        if not os.path.exists(bak):
            with open(bak, 'w', encoding='utf-8') as f:
                f.write(content)
        tmp = manifest + '.tmp'
        with open(tmp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        os.replace(tmp, manifest)
        self._json(200, {'ok': True, 'slide': slide_c})

    def end_headers(self):
        # Never cache — so a reload reflects freshly-saved notes.
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


if __name__ == '__main__':
    os.chdir(ROOT)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), Handler) as httpd:
        print('Serving %s at http://localhost:%d  (speaker-note saving enabled)' % (ROOT, PORT))
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\nStopped.')
