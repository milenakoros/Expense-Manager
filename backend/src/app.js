const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userExpensesRoutes = require('./routes/userExpensesRoutes');
const userCategoriesRoutes = require("./routes/userCategoriesRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const articlesRoutes = require("./routes/articlesRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', userExpensesRoutes);
app.use("/api/user/categories", userCategoriesRoutes);
app.use("/api/user", userProfileRoutes);
app.use("/admin", adminRoutes);
app.use("/", articlesRoutes);

module.exports = app;
