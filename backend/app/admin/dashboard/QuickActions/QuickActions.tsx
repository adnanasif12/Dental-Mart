import './QuickActions.css';

interface Action {
  icon: string;
  label: string;
  bg: string;
}

const actions: Action[] = [
  { icon: '➕', label: 'Add Product', bg: '#ede9fe' },
  { icon: '📋', label: 'New Order', bg: '#d1fae5' },
  { icon: '👤', label: 'Add Customer', bg: '#dbeafe' },
  { icon: '📊', label: 'Generate Report', bg: '#fef3c7' },
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
            <button
              key={action.label}
              className="quick-action-btn"
              style={{ background: action.bg }}
            >
              <span className="quick-action-icon">{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
