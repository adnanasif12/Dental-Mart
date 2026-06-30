import './QuickActions.css';

interface Action {
  icon: string;
  label: string;
  bg: string;
}

import Link from 'next/link';

const actions: Action[] = [
  { icon: '➕', label: 'Add Product', bg: '#ede9fe', href: '/admin/products/create' },
  { icon: '📋', label: 'New Order', bg: '#d1fae5', href: '/admin/orders' },
  { icon: '👤', label: 'Add Customer', bg: '#dbeafe', href: '/admin/customers' },
  { icon: '📊', label: 'Generate Report', bg: '#fef3c7', href: '/admin/reports' },
];

const QuickActions = () => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Quick Actions</span>
      </div>
      <div className="card-body">
        <div className="quick-actions-grid">
          {actions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="quick-action-btn"
              style={{ background: action.bg }}
            >
              <span className="quick-action-icon">{action.icon}</span>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
