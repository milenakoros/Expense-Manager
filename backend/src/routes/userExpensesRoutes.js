const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const userExpensesController = require('../controllers/userExpensesController');

router.get('/user/expenses', authMiddleware, userExpensesController.getUserExpenses);
router.get('/user/expenses/:id', authMiddleware, userExpensesController.getUserExpense);
router.post('/user/expenses', authMiddleware, userExpensesController.addUserExpense);
router.put('/user/expenses/:id', authMiddleware, userExpensesController.updateUserExpense);
router.delete('/user/expenses/:id', authMiddleware, userExpensesController.deleteUserExpense);

module.exports = router;
