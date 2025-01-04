const fs = require('fs');

const readData = () => JSON.parse(fs.readFileSync('data.json', 'utf8'));
const writeData = (data) => fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

exports.getExpenses = (req, res) => {
    const expenses = readData();
    res.json(expenses);
};

exports.getExpense = (req, res) => {
    const expenses = readData();
    const expense = expenses.find(e => e.id === parseInt(req.params.id));
    if (!expense) return res.status(404).send('Wydatek nie znaleziony.');
    res.json(expense);
};

exports.addExpense = (req, res) => {
    const { title, price, body } = req.body;
    const expenses = readData();
    const newExpense = {
        id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
        title: title.trim(),
        body: body || "",
        price: parseFloat(price),
    };
    expenses.push(newExpense);
    writeData(expenses);
    res.status(201).json(newExpense);
};

exports.getExpense = (req, res) => {
    const expenses = readData();
    const expense = expenses.find(e => e.id === parseInt(req.params.id));
  
    if (!expense) {
      return res.status(404).send('Wydatek nie znaleziony.');
    }
  
    res.json(expense);
};
  

exports.deleteExpense = (req, res) => {
    const expenses = readData();
    const expenseIndex = expenses.findIndex(e => e.id === parseInt(req.params.id));
  
    if (expenseIndex === -1) {
      return res.status(404).send('Wydatek nie znaleziony.');
    }
  
    expenses.splice(expenseIndex, 1);
    writeData(expenses);
    res.send('Wydatek został usunięty.');
};
  
exports.updateExpense = (req, res) => {
    const expenses = readData();
    const expenseIndex = expenses.findIndex(e => e.id === parseInt(req.params.id));
  
    if (expenseIndex === -1) {
      return res.status(404).send('Wydatek nie znaleziony.');
    }
  
    const updatedExpense = {
      ...expenses[expenseIndex],
      title: req.body.title || expenses[expenseIndex].title,
      body: req.body.body || expenses[expenseIndex].body,
      price: req.body.price !== undefined ? parseFloat(req.body.price) : expenses[expenseIndex].price,
    };
  
    expenses[expenseIndex] = updatedExpense;
    writeData(expenses);
  
    res.json(updatedExpense);
};
  