import './Sidebar.css';

const NavItem = ({ icon, label, active, badge, onClick }) => (
  <button className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}>
    <span className="nav-item-icon">{icon}</span>
    <span>{label}</span>
    {badge && <span className="nav-item-badge">{badge}</span>}
  </button>
);

const Sidebar = ({ activeNav, setActiveNav }) => {
  const mainNav = [
    { icon: '⊞', label: 'Dashboard' },
    { icon: '📊', label: 'Analytics' },
    { icon: '🛒', label: 'Orders', badge: '12' },
    { icon: '📦', label: 'Products' },
    { icon: '👥', label: 'Customers' },
  ];

  const secondaryNav = [
    { icon: '💬', label: 'Messages', badge: '3' },
    { icon: '📁', label: 'Reports' },
    { icon: '🔔', label: 'Notifications' },
  ];

  const settingsNav = [
    { icon: '⚙️', label: 'Settings' },
    { icon: '🔐', label: 'Security' },
    { icon: '❓', label: 'Help & Support' },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">💎</div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="sidebar-logo-text">DashPro</span>
            <span className="sidebar-logo-badge">v2</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {mainNav.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={activeNav === item.label}
            onClick={() => setActiveNav(item.label)}
          />
        ))}

        <div className="nav-section-label">Management</div>
        {secondaryNav.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={activeNav === item.label}
            onClick={() => setActiveNav(item.label)}
          />
        ))}

        <div className="nav-section-label">Account</div>
        {settingsNav.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeNav === item.label}
            onClick={() => setActiveNav(item.label)}
          />
        ))}
      </nav>

      {/* Footer User */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">RK</div>
          <div>
            <div className="user-info-name">Rahim Khan</div>
            <div className="user-info-role">Super Admin</div>
          </div>
          <span className="user-menu-icon">⋮</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;







