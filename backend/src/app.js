const express = require('express');
const cors = require('cors');
const expensesRoutes = require('./routes/expensesRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes'); 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRoutes);
app.use('/categories', categoriesRoutes);

module.exports = app;
