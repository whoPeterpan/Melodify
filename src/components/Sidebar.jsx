import { NavLink, useNavigate } from 'react-router-dom';

const NAV = [
  { to: '/',        label: 'Home',       icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  { to: '/search',  label: 'Search',     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> },
  { to: '/library', label: 'Library',    icon: <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 5h-3v5.5c0 1.38-1.12 2.5-2.5 2.5S10 13.88 10 12.5s1.12-2.5 2.5-2.5c.57 0 1.08.19 1.5.51V5h4v2zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/></svg> },
];

const PLAYLISTS = [
  { to: '/liked',    label: 'Liked Songs', icon: '❤️' },
  { to: '/tophits',  label: 'Top Hits',    icon: '🔥' },
  { to: '/trending', label: 'Trending',    icon: '📈' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Logo + brand */}
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <svg width="28" height="28" viewBox="0 0 168 168" fill="#1db954" style={{ flexShrink: 0 }}>
          <path d="M84 0C37.6 0 0 37.6 0 84s37.6 84 84 84 84-37.6 84-84S130.4 0 84 0zm38.5 121.2c-1.5 2.5-4.8 3.3-7.3 1.8-20-12.2-45.2-15-74.9-8.2-2.9.7-5.8-1.1-6.5-4-.7-2.9 1.1-5.8 4-6.5 32.5-7.4 60.4-4.2 82.9 9.6 2.5 1.5 3.3 4.8 1.8 7.3zm10.3-22.9c-1.9 3.1-5.9 4.1-9 2.2-22.9-14.1-57.8-18.2-84.9-9.9-3.5 1.1-7.2-.9-8.3-4.4-1.1-3.5.9-7.2 4.4-8.3 30.9-9.4 69.4-4.8 95.7 11.3 3.1 1.9 4.1 5.9 2.1 9.1zm.9-23.8C109 60.5 67.3 59.2 41.6 66.8c-4.2 1.3-8.7-1.1-10-5.3-1.3-4.2 1.1-8.7 5.3-10 29.6-9 74.4-7.3 103.7 10.7 3.7 2.2 5 7 2.7 10.7-2.3 3.7-7 5-10.6 2.6z"/>
        </svg>
        <span className="sidebar-brand">Melodify</span>
      </div>

      {/* Collapse toggle */}
      <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? 'Expand' : 'Collapse'}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          {collapsed
            ? <path d="M8 5l8 7-8 7"/>
            : <path d="M16 5l-8 7 8 7"/>
          }
        </svg>
      </button>

      <div className="sidebar-sep" />

      {/* Main nav */}
      <nav className="sidebar-nav">
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active-nav' : ''}`}
            title={label}
          >
            <span className="nav-icon">{icon}</span>
            <span className="sidebar-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-sep" />
      {!collapsed && <span className="sidebar-section-title">Playlists</span>}

      <nav className="sidebar-nav">
        {PLAYLISTS.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active-nav' : ''}`}
            title={label}
          >
            <span className="nav-icon nav-emoji">{icon}</span>
            <span className="sidebar-label">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
