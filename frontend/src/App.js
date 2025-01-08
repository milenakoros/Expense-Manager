import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseList from "./components/expenses/ExpenseList";
import ExpenseDetails from "./components/expenses/ExpenseDetails";
import EditExpense from "./components/expenses/EditExpense";
import AddExpense from "./components/expenses/AddExpense";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Home from "./pages/Home";
import UserDashboard from "./pages/userDashboard/UserDashboard";


const App = () => {
  return (
    <Router>
      {/* <nav>
        <Link to="/">Lista Wydatków</Link> | <Link to="/add">Dodaj Wydatek</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<ExpenseList />} />
        <Route path="/expenses/:id" element={<ExpenseDetails />} />
        <Route path="/expenses/:id/edit" element={<EditExpense />} />
        <Route path="/add" element={<AddExpense />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/*" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
