/**
 * Header - Top bar with session dropdown and new session button
 *
 * Props:
 *   title: string - Dropdown title (e.g., "Past Conversations")
 *   onDropdownClick: () => void - Called when dropdown is clicked
 *   onNewSession: () => void - Called when + button is clicked
 *   dropdownOpen: boolean - Whether dropdown is open (affects caret direction)
 */
function Header({ title = "Past Conversations", onDropdownClick, onNewSession, dropdownOpen = false }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      padding: '6px 10px',
      gap: 4,
      borderBottom: '1px solid rgb(48, 48, 49)',
      backgroundColor: 'var(--bg-primary)',
      userSelect: 'none',
    }}>
      <button
        className="icon-button"
        style={{
          gap: 6,
          padding: '2px 8px',
          color: 'var(--fg-primary)',
          fontSize: 13,
          fontFamily: 'sans-serif',
          maxWidth: 300,
          overflow: 'hidden',
        }}
        onClick={onDropdownClick}
        title="Past conversations"
      >
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          maxWidth: 300,
          overflow: 'hidden',
        }}>
          <span style={{
            fontWeight: 500,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}>
            {title}
          </span>
          <i
            className="ai-CaretDown"
            style={{
              width: 16,
              height: 16,
              minWidth: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.15s ease',
              transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </span>
      </button>

      <div style={{ flex: 1 }} />

      <button
        className="icon-button"
        onClick={onNewSession}
        aria-label="New session"
        title="New session"
      >
        <i className="ai-Add" style={{ width: 16, height: 16 }} />
      </button>
    </div>
  );
}
