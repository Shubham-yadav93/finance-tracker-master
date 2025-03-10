// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import LineChart from '../components/LineChart';
// import PieChart from '../components/PieChart';
// import './Dashboard.css';

// const Dashboard = () => {
//   const [incomeData, setIncomeData] = useState([1000, 2000, 1500, 3000, 2500, 4000, 3500]);
//   const [expenseData, setExpenseData] = useState([500, 1000, 800, 1200, 900, 1500, 1300]);
//   const [incomeBreakdown, setIncomeBreakdown] = useState({ labels: [], values: [] });
//   const [expenseBreakdown, setExpenseBreakdown] = useState({ labels: [], values: [] });

//   useEffect(() => {
//     // Fetch data from the backend
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/transactions', {
//           headers: { 'x-auth-token': token },
//         });
//         // Process data for charts
//         // Example: setIncomeData(res.data.income);
//         // Example: setExpenseData(res.data.expense);
//       } catch (err) {
//         console.error(err.response.data.msg);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="summary">
//         <div className="card">
//           <h3>Total Credit</h3>
//           <p>₹812345</p>
//         </div>
//         <div className="card">
//           <h3>Total Debit</h3>
//           <p>₹160000</p>
//         </div>
//         <div className="card">
//           <h3>Remaining Balance</h3>
//           <p>₹652345</p>
//         </div>
//       </div>
//       <div className="charts">
//         <div className="chart">
//           <LineChart incomeData={incomeData} expenseData={expenseData} />
//         </div>
//         <div className="chart">
//           <PieChart data={incomeBreakdown} title="Income Breakdown" />
//         </div>
//         <div className="chart">
//           <PieChart data={expenseBreakdown} title="Expense Breakdown" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import './Dashboard.css';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="summary">
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{totalIncome}</p>
        </div>
        <div className="card">
          <h3>Total Expense</h3>
          <p>₹{totalExpense}</p>
        </div>
        <div className="card">
          <h3>Remaining Balance</h3>
          <p>₹{totalIncome - totalExpense}</p>
        </div>
      </div>
      <div className="charts">
        <div className="chart">
          <LineChart transactions={transactions} />
        </div>
        <div className="chart">
          <PieChart transactions={transactions} type="income" />
        </div>
        <div className="chart">
          <PieChart transactions={transactions} type="expense" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;