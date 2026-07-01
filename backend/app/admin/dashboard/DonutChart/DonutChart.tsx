interface Segment {
  label: string;
  value: number;
  color: string;
}

import styles from '../Barchart/Barchart.module.css';

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
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 60;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>Sales by Category</span>
        <button className={styles.cardAction}>Details</button>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.donutWrapper}>
          <div className={styles.donutSvgWrap}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
              <circle cx={cx} cy={cy} r={r} fill="transparent" stroke="#f0f0f7" strokeWidth="22" />
              {buildDonut(segments, cx, cy, r)}
            </svg>
            <div className={styles.donutCenterText}>
              <div className={styles.donutCenterValue}>{total}%</div>
              <div className={styles.donutCenterLabel}>Total</div>
            </div>
          </div>

          <div className={styles.donutLegend}>
            <div className={styles.donutSummary}>
              <div className={styles.donutSummaryValue}>100%</div>
              <div className={styles.donutSummaryLabel}>Total</div>
            </div>
            {segments.map((seg) => (
              <div className={styles.donutLegendItem} key={seg.label}>
                <div className={styles.donutLegendLeft}>
                  <div className={styles.donutLegendDot} style={{ background: seg.color }} />
                  <span className={styles.donutLegendLabel}>{seg.label}</span>
                </div>
                <span className={styles.donutLegendVal}>{seg.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
