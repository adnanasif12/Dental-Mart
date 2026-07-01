import styles from './Barchart.module.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const revenueData = [62, 78, 55, 90, 72, 84, 95];
const expenseData = [40, 50, 38, 60, 48, 55, 62];

const BarChart = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.cardTitle}>Revenue vs Expense</span>
        <button className={styles.cardAction}>This Year</button>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.chartContainer}>
          <div className={styles.chartBarGroup}>
            {months.map((month, idx) => (
              <div className={styles.monthGroup} key={month}>
                <div
                  className={styles.chartBar}
                  style={{
                    height: `${revenueData[idx]}%`,
                    background: 'linear-gradient(180deg, #7c3aed, #a78bfa)',
                  }}
                  title={`Revenue: ${revenueData[idx]}k`}
                />
                <div
                  className={styles.chartBar}
                  style={{
                    height: `${expenseData[idx]}%`,
                    background: 'linear-gradient(180deg, #10b981, #6ee7b7)',
                  }}
                  title={`Expense: ${expenseData[idx]}k`}
                />
              </div>
            ))}
          </div>

          <div className={styles.monthLabels}>
            {months.map((month) => (
              <span key={month} className={styles.monthLabel}>
                {month}
              </span>
            ))}
          </div>

          <div className={styles.chartLegend}>
            <div className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: '#7c3aed' }} />
              Revenue
            </div>
            <div className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: '#10b981' }} />
              Expense
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;



