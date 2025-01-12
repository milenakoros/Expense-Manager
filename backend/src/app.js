const express = require('express');
const cors = require('cors');
const expensesRoutes = require('./routes/expensesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const authRoutes = require('./routes/authRoutes');
const userExpensesRoutes = require('./routes/userExpensesRoutes');
const userCategoriesRoutes = require("./routes/userCategoriesRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/auth', authRoutes);
app.use('/api', userExpensesRoutes);
app.use("/api/user/categories", userCategoriesRoutes);
app.use("/api/user", userProfileRoutes);

module.exports = app;
