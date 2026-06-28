import './StatsCards.css';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: string;
  iconBg: string;
  shapeBg: string;
}

const StatsCard = ({
  label,
  value,
  change,
  positive,
  icon,
  iconBg,
  shapeBg,
}: StatsCardProps) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-label">{label}</span>
        <div className="stat-card-icon" style={{ background: iconBg }}>
          {icon}
        </div>
      </div>

      <div className="stat-card-value">{value}</div>

      <div className="stat-card-change">
        <span className={positive ? 'change-positive' : 'change-negative'}>
          {positive ? '▲' : '▼'} {change}
        </span>
        <span className="change-text">vs last month</span>
      </div>

      <div
        className="stat-card-bg-shape"
        style={{ background: shapeBg }}
      />
    </div>
  );
};

export default StatsCard;
