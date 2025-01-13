import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MonthDropdown from './Dropdown';
import SearchBox from './SearchBox';
import TransactionTable from './TransactionTable';
import Statistics from './Statistics';
import BarChartComponent from './BarChartComponent';
import PieChartComponent from './PieChartComponent';

const Dashboard = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const response = await Axios.get('http://localhost:5000/api/combined', {
          params: {
            month: selectedMonth,
            searchTerm,
            page: currentPage,
          },
        });

        const { transactions, statistics, barChartData, pieChartData } = response.data;

        setTransactions(transactions);
        setStatistics(statistics);
        setBarChartData(barChartData);
        setPieChartData(pieChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [searchTerm, selectedMonth, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>

      {/* Search and Month Dropdown */}
      <div className="select-container">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <MonthDropdown
          months={months}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>

      {loading ? (
        <div className="spinner" style={{ margin: '50px auto', textAlign: 'center' }}></div>
      ) : (
        <>
          
          <TransactionTable
            transactions={transactions}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />

          <div className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '1 1 48%' }} className='stats'>
              <Statistics stats={statistics} />
            </div>
            <div style={{ flex: '1 1 48%' }}>
              <PieChartComponent data={pieChartData} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="card">
            <div className="card-header">Bar Chart</div>
            <div className="card-body">
              <BarChartComponent data={barChartData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
