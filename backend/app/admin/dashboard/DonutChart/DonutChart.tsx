interface Segment {
  label: string;
  value: number;
  color: string;
}

const segments: Segment[] = [
  { label: 'Electronics', value: 40, color: '#7c3aed' },
  { label: 'Clothing', value: 25, color: '#10b981' },
  { label: 'Books', value: 20, color: '#f59e0b' },
  { label: 'Others', value: 15, color: '#3b82f6' },
];

const total = segments.reduce((acc, s) => acc + s.value, 0);

const buildDonut = (segs: Segment[], cx: number, cy: number, r: number) => {
  let cumulative = 0;
  const circumference = 2 * Math.PI * r;

  return segs.map((seg) => {
    const offset = circumference * (1 - cumulative / total);
    const dash = (seg.value / total) * circumference;
    const gap = circumference - dash;
    cumulative += seg.value;

    return (
      <circle
        key={seg.label}
        cx={cx}
        cy={cy}
        r={r}
        fill="transparent"
        stroke={seg.color}
        strokeWidth="22"
        strokeDasharray={`${dash} ${gap}`}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    );
  });
};

const DonutChart = () => {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 55;

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">Sales by Category</span>
        <button className="card-action">Details</button>
      </div>
      <div className="card-body">
        <div className="donut-wrapper">
          {/* SVG Donut */}
          <div className="donut-svg-wrap">
            <svg
              width={size}
              height={size}
              style={{ transform: 'rotate(-90deg)' }}
            >
              {/* Background circle */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="transparent"
                stroke="#f0f0f7"
                strokeWidth="22"
              />
              {buildDonut(segments, cx, cy, r)}
            </svg>
            <div className="donut-center-text">
              <div className="donut-center-value">{total}%</div>
              <div className="donut-center-label">Total</div>
            </div>
          </div>

          {/* Legend */}
          <div className="donut-legend">
            {segments.map((seg) => (
              <div className="donut-legend-item" key={seg.label}>
                <div className="donut-legend-left">
                  <div
                    className="donut-legend-dot"
                    style={{ background: seg.color }}
                  />
                  <span className="donut-legend-label">{seg.label}</span>
                </div>
                <span className="donut-legend-val">{seg.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
