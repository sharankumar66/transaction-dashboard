import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const chartData = {
    labels: data.map((item) => item.range),
    datasets: [
      {
        label: 'Count',
        data: data.map((item) => item.count),
        backgroundColor: '#8884d8',
        borderColor: '#8884d8',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChartComponent;
