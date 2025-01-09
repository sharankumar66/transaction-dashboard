import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: 'Count', 
        data: data.map((item) => item.count),
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChartComponent;
