import React from 'react';

const TransactionTable = ({ transactions, currentPage, onPageChange }) => {
  return (
    <div className="transaction-table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>Previous</button>
        <span>Page {currentPage}</span>
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionTable;
