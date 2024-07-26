import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import PiggyBankAnimation from './PiggyBankAnimation';
import WelcomeAnimation from './WelcomeAnimation';
import ExpenseForm from './ExpenseForm'; // Import ExpenseForm

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const totalIncome = 50000; // Example total income
  const savings = 10000; // Example savings

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(storedExpenses);
  }, []);

  const addExpense = (newExpense) => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses)); // Save to localStorage
  };

  const totalExpenses = expenses.reduce((acc, expense) => acc + Number(expense.amount), 0);
  const remainingAmount = totalIncome - savings - totalExpenses;

  const data = {
    labels: ['Savings', 'Expenses', 'Remaining'],
    datasets: [
      {
        label: 'Money',
        data: [savings, totalExpenses, remainingAmount],
        backgroundColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderColor: [
          'rgba(0,0,0)',
          'rgba(0,0,0)',
          'rgba(0,0,0)',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <WelcomeAnimation username="Yashu" />
      <h1>Track Your Finance</h1>
      <Bar data={data} />
      <br/>
      <PiggyBankAnimation amount={remainingAmount} />
      <ExpenseForm onAddExpense={addExpense} /> {/* Include ExpenseForm */}
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{expense.description}: ${expense.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
