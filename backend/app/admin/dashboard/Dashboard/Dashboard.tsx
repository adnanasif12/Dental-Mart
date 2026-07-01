import './dashboard.css';
import StatsCard from '../StatsCard/StatsCard';
import BarChart from '../Barchart/Barchart';
import DonutChart from '../DonutChart/DonutChart';
import RecentActivity from '../RecentAction/RecentAction';
import ProgressSection from '../ProgressSection/ProgressSection';
import QuickActions from '../QuickActions/QuickActions';





const statsData = [
  {
    label: 'Total Revenue',
    value: '৳4.82L',
    change: '12.5%',
    positive: true,
    icon: '💰',
    iconBg: 'linear-gradient(135deg, #ede9fe, #ddd6fe)',
    shapeBg: '#7c3aed',
  },
  {
    label: 'Total Orders',
    value: '3,248',
    change: '8.2%',
    positive: true,
    icon: '🛒',
    iconBg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
    shapeBg: '#10b981',
  },
  {
    label: 'New Customers',
    value: '892',
    change: '3.1%',
    positive: false,
    icon: '👥',
    iconBg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
    shapeBg: '#3b82f6',
  },
  {
    label: 'Conversion Rate',
    value: '24.7%',
    change: '5.4%',
    positive: true,
    icon: '📈',
    iconBg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
    shapeBg: '#f59e0b',
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-content">
      <div className="page-title">Dashboard Overview</div>
      <div className="page-subtitle">
        Welcome back! Here's what's happening today.
      </div>

      {/* Stats Row */}
      <div className="grid-stats">
        {statsData.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid-charts" style={{ marginBottom: '24px' }}>
        <BarChart />
        <DonutChart />
      </div>

      {/* Bottom Row */}
      <div className="grid-bottom">
        <RecentActivity />
        <div className="right-column">
          <QuickActions />
          <ProgressSection />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
