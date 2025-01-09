import React from 'react';

const MonthDropdown = ({ months, selectedMonth, onMonthChange }) => {
  return (
    <div className="card">
      <div className="card-header">Select Month</div>
      <div className="card-body">
        <select value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)}>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthDropdown;
