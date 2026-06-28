import './ProgressSection.css';

interface ProgressItem {
  label: string;
  value: number;
  color: string;
}

const progressData: ProgressItem[] = [
  { label: 'Sales Target', value: 78, color: '#7c3aed' },
  { label: 'Customer Satisfaction', value: 92, color: '#10b981' },
  { label: 'Product Quality', value: 85, color: '#f59e0b' },
  { label: 'Marketing Reach', value: 60, color: '#3b82f6' },
  { label: 'Support Response', value: 70, color: '#ec4899' },
];

const ProgressSection = () => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Performance Goals</span>
        <button className="card-action">Edit Goals</button>
      </div>
      <div className="card-body">
        <div className="progress-section">
          {progressData.map((item) => (
            <div className="progress-item" key={item.label}>
              <div className="progress-header">
                <span className="progress-label">{item.label}</span>
                <span className="progress-value">{item.value}%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${item.value}%`,
                    background: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
