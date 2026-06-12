/**
 * UserMessage - User chat bubble
 *
 * Props:
 *   text: string - Message content
 *   attachments: Array<{ name, type }> - Optional file attachments
 */
// Namespaced as VSC* — collided with components.jsx terminal UserMessage/ToolCall
function VSCUserMessage({ text, attachments = [] }) {
  return (
    <div style={{
      display: 'block',
      alignItems: 'flex-start',
      paddingTop: 12,
      paddingBottom: 4,
      flexDirection: 'column',
      position: 'relative',
      textAlign: 'left',
      fontSize: 13,
      fontFamily: 'sans-serif',
      lineHeight: '19.5px',
    }}>
      <div style={{ display: 'inline-block', position: 'relative', margin: '0 0 4px' }}>
        <div style={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          backgroundColor: 'rgb(60, 60, 60)',
          display: 'inline-block',
          maxWidth: '100%',
          userSelect: 'text',
          padding: '4px 6px',
          borderRadius: 4,
          border: '1px solid rgb(69, 69, 69)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 'fit-content',
            position: 'relative',
            gap: 4,
          }}>
            <div>
              <span style={{ color: 'var(--fg-primary)' }}>{text}</span>
            </div>
          </div>
        </div>
      </div>
      {attachments.length > 0 && (
        <div>
          {attachments.map((att, i) => (
            <div key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              fontSize: 11,
              color: 'var(--fg-secondary)',
            }}>
              <i className="ai-File" style={{ fontSize: 12 }} />
              <span>{att.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * AssistantMessage - Claude response text
 *
 * Props:
 *   children: ReactNode - Message content (can include markdown-rendered content)
 */
function VSCAssistantMessage({ children }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 30,
      flexDirection: 'column',
      position: 'relative',
      userSelect: 'text',
      color: 'var(--fg-primary)',
      fontSize: 13,
      fontFamily: 'sans-serif',
      lineHeight: '19.5px',
    }}>
      {/* White dot */}
      <div style={{
        position: 'absolute',
        left: 8,
        top: 14,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'var(--fg-primary)',
      }} />
      <span style={{ width: '100%', overflowX: 'hidden' }}>{children}</span>
    </div>
  );
}

/**
 * ToolCall - Tool invocation row (Read, Edit, Bash, etc.)
 *
 * Props:
 *   tool: string - Tool name (Read, Edit, Bash, etc.)
 *   target: string - File path or command
 *   status: 'success' | 'error' | 'pending' - Execution status
 *   detail: string - Optional detail text (e.g., "Added 4 lines")
 *   children: ReactNode - Optional expanded content
 */
function VSCToolCall({ tool, target, status = 'success', detail, children }) {
  const dotColor = {
    success: 'rgb(129, 199, 132)',
    error: 'rgb(229, 115, 115)',
    pending: 'var(--claude-orange)',
  }[status];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 30,
      flexDirection: 'column',
      position: 'relative',
      userSelect: 'text',
      color: 'var(--fg-primary)',
      fontSize: 13,
      fontFamily: 'sans-serif',
      lineHeight: '19.5px',
      maxWidth: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Status dot */}
      <div style={{
        position: 'absolute',
        left: 8,
        top: 14,
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: dotColor,
      }} />

      <div style={{ width: 'calc(100% - 30px)', maxWidth: '100%' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            maxWidth: '100%',
            overflow: 'hidden',
          }}>
            <span style={{ fontWeight: 700, marginRight: 4 }}>{tool}</span>
            <span style={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'var(--fg-primary)',
              paddingTop: 1,
              wordBreak: 'break-all',
              overflowWrap: 'anywhere',
              flex: 1,
            }}>
              {target}
            </span>
          </div>
        </div>
      </div>

      {detail && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          gap: 4,
          marginTop: 2,
          marginBottom: 2,
          fontSize: 11,
          color: 'var(--fg-secondary)',
          opacity: 0.7,
          width: '100%',
        }}>
          <span style={{ flexShrink: 0 }}>{detail}</span>
        </div>
      )}

      {children && (
        <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * CodeBlock - Syntax-highlighted code display
 *
 * Props:
 *   title: string - Block title (e.g., "# Setup")
 *   language: string - Language for syntax highlighting
 *   children: string - Code content
 */
function CodeBlock({ title, language, children }) {
  return (
    <div style={{
      backgroundColor: 'rgb(37, 37, 38)',
      borderRadius: 5,
      margin: '8px 0',
      overflow: 'hidden',
      border: '0.5px solid rgb(69, 69, 69)',
      fontSize: 13,
      maxWidth: '100%',
    }}>
      {title && (
        <div style={{
          padding: '4px 8px',
          borderBottom: '0.5px solid rgb(69, 69, 69)',
          fontSize: 11.7,
          fontFamily: 'monospace',
          color: 'var(--fg-secondary)',
        }}>
          {title}
        </div>
      )}
      <pre style={{
        margin: 0,
        padding: 4,
        fontSize: 12,
        fontFamily: 'monospace',
        color: 'var(--fg-primary)',
        overflowX: 'auto',
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

Object.assign(window, { VSCUserMessage, VSCAssistantMessage, VSCToolCall, CodeBlock });
