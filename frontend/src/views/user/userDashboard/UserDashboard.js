import React from "react";
import { Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import UserExpenseList from "../userExpenses/UserExpenseList";
import UserAddExpense from "../userExpenses/UserAddExpense";
import UserEditExpense from "../userExpenses/UserEditExpense";
import UserExpenseDetails from "../userExpenses/UserExpenseDetails";
import UserCategoryList from "../userCategories/UserCategoryList";
import UserAddCategory from "../userCategories/UserAddCategory";
import UserEditCategory from "../userCategories/UserEditCategory";
import ReassignCategoryPage from "../userCategories/ReassignCategoryPage";
import Articles from "./UserArticles";
import UserNav from "./UserNav";
import "../../../styles/User.css"

const UserDashboard = () => {
    return (
        <div>
            <UserNav />
            <Routes>
                <Route path="/profile" element={<UserProfile />} />

                <Route path="/expenses" element={<UserExpenseList />} />
                <Route path="/expenses/add" element={<UserAddExpense />} />
                <Route path="/expenses/:id/edit" element={<UserEditExpense />} />
                <Route path="/expenses/:id" element={<UserExpenseDetails />} />

                <Route path="/categories" element={<UserCategoryList />} />
                <Route path="/categories/add" element={<UserAddCategory />} />
                <Route path="/categories/:id/edit" element={<UserEditCategory />} />
                <Route path="/categories/:id/reassign" element={<ReassignCategoryPage />} />
                <Route path="/articles" element={<Articles />} />
            </Routes>
        </div>
    );
};

export default UserDashboard;
