import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTransactions } from '../context/TransactionContext';
import styles from './Chart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart = () => {
  const { transactions } = useTransactions();

  // Group by date
  const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  const labels = [];
  const incomeData = [];
  const expenseData = [];

  const dateMap = {};

  sortedTx.forEach(tx => {
    const d = tx.date;
    if (!dateMap[d]) {
      dateMap[d] = { income: 0, expense: 0 };
    }
    if (tx.type === 'Income') {
      dateMap[d].income += tx.amount;
    } else {
      dateMap[d].expense += tx.amount;
    }
  });

  Object.keys(dateMap).sort((a, b) => new Date(a) - new Date(b)).forEach(date => {
    labels.push(date);
    incomeData.push(dateMap[date].income);
    expenseData.push(dateMap[date].expense);
  });

  // If no data, show empty chart state
  if (labels.length === 0) {
    labels.push('Income vs Expenses');
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData.length ? incomeData : [0],
        borderColor: '#16A34A',
        backgroundColor: 'rgba(22, 163, 74, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: expenseData.length ? expenseData : [0],
        borderColor: '#DC2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'var(--text-secondary)'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' }
      },
      x: {
        ticks: { color: 'var(--text-secondary)' },
        grid: { color: 'var(--border-color)' }
      }
    }
  };

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.title}>Cash Flow Analysis</h3>
      <div className={styles.canvasContainer}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
