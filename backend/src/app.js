const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expenseRoutes = require('./routes/expensesRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/expenses', expenseRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Błąd serwera');
});

module.exports = app;
