interface ActivityItem {
  icon: string;
  iconBg: string;
  title: string;
  desc: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    icon: '🛒',
    iconBg: '#ede9fe',
    title: 'New Order Received',
    desc: 'Order #4521 from Karim Ahmed — ৳12,500',
    time: '2 min ago',
  },
  {
    icon: '👤',
    iconBg: '#d1fae5',
    title: 'New User Registered',
    desc: 'Fatima Begum joined as a customer',
    time: '18 min ago',
  },
  {
    icon: '💳',
    iconBg: '#fef3c7',
    title: 'Payment Completed',
    desc: 'Invoice #INV-882 — ৳8,000 received',
    time: '45 min ago',
  },
  {
    icon: '📦',
    iconBg: '#dbeafe',
    title: 'Product Shipped',
    desc: 'Order #4498 dispatched to Dhaka',
    time: '1 hr ago',
  },
  {
    icon: '⭐',
    iconBg: '#fce7f3',
    title: 'New Review',
    desc: 'Ratan Das gave 5 stars on Premium Plan',
    time: '3 hr ago',
  },
];

const RecentActivity = () => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Recent Activity</span>
        <button className="card-action">View All</button>
      </div>
      <div className="card-body">
        {activities.map((item, idx) => (
          <div className="activity-item" key={idx}>
            <div className="activity-dot" style={{ background: item.iconBg }}>
              {item.icon}
            </div>
            <div className="activity-info">
              <div className="activity-title">{item.title}</div>
              <div className="activity-desc">{item.desc}</div>
            </div>
            <div className="activity-time">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
