// import React from 'react';
// import { Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = ({ data, title }) => {
//   const chartData = {
//     labels: data.labels,
//     datasets: [
//       {
//         data: data.values,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: title,
//       },
//     },
//   };

//   return <Pie data={chartData} options={options} />;
// };

// export default PieChart;


// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ transactions, type }) => {
  // Process data for pie chart
  const categoryData = transactions
    .filter(t => t.type === type)
    .reduce((acc, transaction) => {
      acc[transaction.description] = (acc[transaction.description] || 0) + transaction.amount;
      return acc;
    }, {});

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#E7E9ED', '#C9CBCF'
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#E7E9ED', '#C9CBCF'
      ]
    }]
  };

  return (
    <div>
      <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;