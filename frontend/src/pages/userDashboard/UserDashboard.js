import React from "react";
import { Routes, Route, Link } from "react-router-dom"; // Usuń BrowserRouter
import UserProfile from "./UserProfile";
import UserExpenseList from "../../components/userExpenses/UserExpenseList";
import UserAddExpense from "../../components/userExpenses/UserAddExpense";
import UserEditExpense from "../../components/userExpenses/UserEditExpense";
import UserCategoryList from "../../components/userCategories/UserCategoryList";

const UserDashboard = () => {
    return (
        <div>
            <nav>
                <Link to="/user/profile">Profil</Link>
                <Link to="/user/expenses">Wydatki</Link>
                <Link to="/user/expenses/add">Dodaj Wydatek</Link>
                <Link to="/user/categories">Kategorie</Link>
            </nav>
            <Routes>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/expenses" element={<UserExpenseList />} />
                <Route path="/expenses/add" element={<UserAddExpense />} />
                <Route path="/expenses/:id/edit" element={<UserEditExpense />} />
                <Route path="/categories" element={<UserCategoryList />} />
            </Routes>
        </div>
    );
};

export default UserDashboard;
