export default function NavSidebar({ tab, onTabChange }) {
  return (
    <div className="nav-sidebar">
      <button
        className={`nav-btn ${tab === 'memo' ? 'active' : ''}`}
        onClick={() => onTabChange('memo')}
        title="메모"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="6" y1="13" x2="11" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="nav-label">메모</span>
      </button>
      <button
        className={`nav-btn ${tab === 'settings' ? 'active' : ''}`}
        onClick={() => onTabChange('settings')}
        title="설정"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="nav-label">설정</span>
      </button>
    </div>
  )
}
