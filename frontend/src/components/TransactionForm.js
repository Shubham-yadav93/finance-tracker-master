import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ fetchTransactions }) => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/transactions',
        { type, amount, description },
        { headers: { 'x-auth-token': token } }
      );
      fetchTransactions();
      setAmount('');
      setDescription('');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;