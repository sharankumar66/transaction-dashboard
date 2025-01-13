import { React }from 'react';

const Statistics = ({ stats }) => {
  return (
    <div>
      <h3>Statistics</h3>
      <p>Total Sale Amount: {stats.totalSaleAmount}</p>
      <p>Total Sold Items: {stats.totalSoldItems}</p>
      <p>Total Not Sold Items: {stats.totalNotSoldItems}</p>
    </div>
  );
};

export default Statistics;
