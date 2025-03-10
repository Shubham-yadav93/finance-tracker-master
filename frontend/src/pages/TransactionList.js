import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';
import './TransactionList.css'; // Import the CSS file

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/transactions', {
        headers: { 'x-auth-token': token },
      });
      setTransactions(res.data);
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: { 'x-auth-token': token },
      });
      fetchTransactions();
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div className="transaction-list">
      <h1>Transactions</h1>
      <TransactionForm fetchTransactions={fetchTransactions} />
      <div className="transactions">
        {transactions.map((t) => (
          <div key={t._id} className="transaction-card">
            <div className="transaction-info">
              <span className={`transaction-type ${t.type}`}>{t.type}</span>
              <span className="transaction-amount">${t.amount}</span>
              <span className="transaction-description">{t.description}</span>
            </div>
            <button className="delete-btn" onClick={() => deleteTransaction(t._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;