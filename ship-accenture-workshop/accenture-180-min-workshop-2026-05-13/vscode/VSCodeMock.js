/**
 * VSCodeMock - Wireframe VSCode window frame for mockups
 *
 * Components:
 *   VSCodeWindow - Main window container with title bar, activity bar, sidebar, editor, and Claude panel
 *   TitleBar - Window title bar with traffic lights
 *   ActivityBar - Left icon bar
 *   Sidebar - File explorer
 *   CodeEditor - Syntax-highlighted code display
 *
 * Props for VSCodeWindow:
 *   highlightLine: number - Line number to highlight in code editor
 *   children: ReactNode - Content for Claude panel
 */

function TitleBar() {
  return (
    <div className="vscode-titlebar">
      <div className="window-controls">
        <div className="window-control close" />
        <div className="window-control minimize" />
        <div className="window-control maximize" />
      </div>
      <div className="window-title">index.ts - my-project - Visual Studio Code</div>
      <div style={{ width: 52 }} />
    </div>
  );
}

function ActivityBar() {
  return (
    <div className="activity-bar">
      <div className="activity-item"><i className="ai-Files" /></div>
      <div className="activity-item"><i className="ai-Search" /></div>
      <div className="activity-item"><i className="ai-Branch" /></div>
      <div className="activity-item"><i className="ai-Play" /></div>
      <div className="activity-item active"><i className="ai-Chat" /></div>
      <div className="activity-spacer" />
      <div className="activity-item"><i className="ai-Settings" /></div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Explorer</div>
      <div className="file-tree">
        <div className="file-item">
          <i className="ai-CaretDown" style={{ fontSize: 10, width: 14 }} />
          <i className="ai-Folder" style={{ color: '#dcb67a' }} />
          <span>src</span>
        </div>
        <div className="file-item" style={{ paddingLeft: 28 }}>
          <i className="ai-File" style={{ color: '#519aba' }} />
          <span>index.ts</span>
        </div>
        <div className="file-item" style={{ paddingLeft: 28 }}>
          <i className="ai-File" style={{ color: '#519aba' }} />
          <span>utils.ts</span>
        </div>
        <div className="file-item" style={{ paddingLeft: 28 }}>
          <i className="ai-File" style={{ color: '#6d8086' }} />
          <span>types.d.ts</span>
        </div>
        <div className="file-item">
          <i className="ai-File" style={{ color: '#6d8086' }} />
          <span>package.json</span>
        </div>
        <div className="file-item">
          <i className="ai-File" style={{ color: '#6d8086' }} />
          <span>README.md</span>
        </div>
      </div>
    </div>
  );
}

function CodeEditor({ highlightLine }) {
  const lines = [
    { num: 1, content: <><span className="keyword">import</span> {'{ '}<span className="type">Request</span>{', '}<span className="type">Response</span>{' } '}<span className="keyword">from</span> <span className="string">'express'</span>;</> },
    { num: 2, content: <><span className="keyword">import</span> {'{ '}<span className="function">validateUser</span>{' } '}<span className="keyword">from</span> <span className="string">'./utils'</span>;</> },
    { num: 3, content: '' },
    { num: 4, content: <><span className="keyword">export async function</span> <span className="function">handleAuth</span>(req: <span className="type">Request</span>, res: <span className="type">Response</span>) {'{'}</> },
    { num: 5, content: <>  <span className="keyword">const</span> {'{ username, password }'} = req.body;</> },
    { num: 6, content: '' },
    { num: 7, content: <>  <span className="comment">{'// TODO: Add rate limiting'}</span></> },
    { num: 8, content: <>  <span className="keyword">const</span> user = <span className="keyword">await</span> <span className="function">validateUser</span>(username, password);</> },
    { num: 9, content: '' },
    { num: 10, content: <>  <span className="keyword">if</span> (!user) {'{'}</> },
    { num: 11, content: <>    <span className="keyword">return</span> res.<span className="function">status</span>(401).<span className="function">json</span>({'{ error: '}<span className="string">'Invalid credentials'</span>{' }'})</> },
    { num: 12, content: <>  {'}'}</> },
    { num: 13, content: '' },
    { num: 14, content: <>  <span className="keyword">return</span> res.<span className="function">json</span>({'{ user }'})</> },
    { num: 15, content: <>{'}'}</> },
  ];

  return (
    <div className="code-editor">
      {lines.map(line => (
        <div key={line.num} className={`code-line ${highlightLine === line.num ? 'highlight' : ''}`}>
          <div className="line-number">{line.num}</div>
          <div className="line-content">{line.content}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * VSCodeWindow - Complete VSCode window mock
 *
 * Props:
 *   highlightLine: number - Line to highlight in the code editor
 *   children: ReactNode - Content for the Claude panel on the right
 */
function VSCodeWindow({ highlightLine, children }) {
  return (
    <div className="vscode-window">
      <TitleBar />
      <div className="vscode-main">
        <ActivityBar />
        <Sidebar />
        <div className="editor-area">
          <div className="tabs-bar">
            <div className="tab active">
              <i className="ai-File" style={{ color: '#519aba' }} />
              <span>index.ts</span>
            </div>
            <div className="tab">
              <i className="ai-File" />
              <span>utils.ts</span>
            </div>
          </div>
          <div className="editor-content">
            <CodeEditor highlightLine={highlightLine} />
            <div className="claude-panel">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export to window for use in other scripts
Object.assign(window, {
  VSCodeWindow,
  TitleBar,
  ActivityBar,
  Sidebar,
  CodeEditor,
});
