import './Barchart.module.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const revenueData = [62, 78, 55, 90, 72, 84, 95];
const expenseData = [40, 50, 38, 60, 48, 55, 62];

const maxVal = 100;

const BarChart = () => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Revenue vs Expense</span>
        <button className="card-action">This Year</button>
      </div>
      <div className="card-body">
        <div className="chart-container">
          <div className="chart-bar-group">
            {months.map((month, idx) => (
              <div className="chart-bar-wrap" key={month}>
                {/* Revenue bar */}
                <div
                  className="chart-bar"
                  style={{
                    height: `${(revenueData[idx] / maxVal) * 100}%`,
                    background: 'linear-gradient(180deg, #7c3aed, #a78bfa)',
                  }}
                  title={`Revenue: ${revenueData[idx]}k`}
                />
                {/* Expense bar */}
                <div
                  className="chart-bar"
                  style={{
                    height: `${(expenseData[idx] / maxVal) * 100}%`,
                    background: 'linear-gradient(180deg, #10b981, #6ee7b7)',
                  }}
                  title={`Expense: ${expenseData[idx]}k`}
                />
              </div>
            ))}
          </div>

          {/* X-axis labels */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            {months.map((month) => (
              <div
                key={month}
                className="chart-bar-label"
                style={{ flex: 1, textAlign: 'center' }}
              >
                {month}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#7c3aed' }} />
              Revenue
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: '#10b981' }} />
              Expense
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
