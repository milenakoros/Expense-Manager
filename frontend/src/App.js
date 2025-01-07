import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseList from "./components/ExpenseList";
import ExpenseDetails from "./components/ExpenseDetails";
import EditExpense from "./components/EditExpense";
import AddExpense from "./components/AddExpense";
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Lista Wydatków</Link> | <Link to="/add">Dodaj Wydatek</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ExpenseList />} />
        <Route path="/expenses/:id" element={<ExpenseDetails />} />
        <Route path="/expenses/:id/edit" element={<EditExpense />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
