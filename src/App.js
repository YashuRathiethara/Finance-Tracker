import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ExpenseForm from './components/ExpenseForm';

const App = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/add-expense" element={<ExpenseForm />} />
  </Routes>
);

export default App;
