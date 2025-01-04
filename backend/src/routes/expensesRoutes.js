const express = require('express');
const { getExpenses, getExpense, addExpense, updateExpense, deleteExpense } = require('../controllers/expensesController');
const router = express.Router();

router.get('/', getExpenses);
router.get('/:id', getExpense);
router.post('/', addExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
