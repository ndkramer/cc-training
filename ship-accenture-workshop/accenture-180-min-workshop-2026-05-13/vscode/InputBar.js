/**
 * InputBar - Message input with toolbar
 *
 * Props:
 *   value: string - Current input value
 *   onChange: (value) => void - Called when input changes
 *   onSubmit: () => void - Called when form is submitted
 *   placeholder: string - Input placeholder text
 *   editMode: 'ask' | 'auto' | 'plan' - Current edit mode
 *   onEditModeClick: () => void - Called when edit mode chip is clicked
 *   onAttachClick: () => void - Called when attachment button is clicked
 *   onSlashClick: () => void - Called when slash button is clicked
 *   disabled: boolean - Whether input is disabled
 *   inline: boolean - If true, don't use absolute positioning (for stacking with other elements)
 */
function InputBar({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Ask Claude...',
  editMode = 'ask',
  onEditModeClick,
  onAttachClick,
  onSlashClick,
  disabled = false,
  inline = false,
}) {
  const isEmpty = !value.trim();

  const editModeLabels = {
    ask: 'Ask before edits',
    auto: 'Auto-edit',
    plan: 'Plan mode',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmpty) onSubmit?.();
  };

  const containerStyle = inline
    ? { position: 'relative' }
    : { position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 20 };

  return (
    <div style={containerStyle}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-input)',
          border: '1px solid var(--border-input)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
        onSubmit={handleSubmit}
      >
        <div style={{
          position: 'relative',
          display: 'flex',
        }}>
          <div
            contentEditable={!disabled}
            role="textbox"
            aria-label="Message input"
            aria-multiline="true"
            style={{
              flex: 1,
              minHeight: 20,
              maxHeight: 200,
              padding: '10px 14px',
              fontSize: 'var(--font-size-md)',
              fontFamily: 'var(--font-family)',
              lineHeight: 1.5,
              color: 'var(--fg-primary)',
              outline: 'none',
              overflowY: 'auto',
            }}
            onInput={(e) => onChange?.(e.currentTarget.textContent || '')}
            data-placeholder={placeholder}
          />
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: 5,
          borderTop: '0.5px solid var(--border-input)',
          color: 'var(--fg-secondary)',
        }}>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 4px',
              border: 'none',
              borderRadius: 2,
              background: 'transparent',
              color: 'var(--fg-secondary)',
              fontSize: 11,
              fontFamily: 'var(--font-family)',
              cursor: 'pointer',
            }}
            onClick={onEditModeClick}
            title="Click to switch edit modes"
          >
            <i className="ai-Edit" style={{ fontSize: 11, flexShrink: 0 }} />
            <span style={{
              maxWidth: 200,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}>
              {editModeLabels[editMode]}
            </span>
          </button>

          <div style={{ flex: 1 }} />

          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              border: 'none',
              borderRadius: '50%',
              background: 'transparent',
              color: 'var(--fg-secondary)',
              cursor: 'pointer',
            }}
            onClick={onAttachClick}
            title="Add attachment"
          >
            <i className="ai-Attachment" style={{ fontSize: 16, fontWeight: 600, transform: 'translateY(2px)' }} />
          </button>

          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              border: 'none',
              borderRadius: '50%',
              background: 'transparent',
              color: 'var(--fg-secondary)',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 14,
            }}
            onClick={onSlashClick}
            title="Show command menu (/)"
          >
            /
          </button>

          <button
            type="submit"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              border: 'none',
              borderRadius: 5,
              backgroundColor: 'var(--claude-clay)',
              color: 'var(--claude-ivory)',
              opacity: isEmpty ? 0.4 : 1,
              cursor: isEmpty ? 'not-allowed' : 'pointer',
            }}
            disabled={isEmpty}
          >
            <i className="ai-ArrowUp" style={{ fontSize: 14, transform: 'scale(1.4) translateY(3px)', fontWeight: 600 }} />
          </button>
        </div>
      </form>
    </div>
  );
}
