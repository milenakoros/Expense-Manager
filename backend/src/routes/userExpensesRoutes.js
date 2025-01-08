const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userExpensesController = require('../controllers/userExpensesController');

router.get('/user/expenses', authMiddleware, userExpensesController.getUserExpenses);
router.post('/user/expenses', authMiddleware, userExpensesController.addUserExpense);
router.put('/user/expenses/:id', authMiddleware, userExpensesController.updateUserExpense);
router.delete('/user/expenses/:id', authMiddleware, userExpensesController.deleteUserExpense);
router.get("/user/profile", authMiddleware, userExpensesController.getUserProfile);
router.put("/user/profile", authMiddleware, userExpensesController.updateUserProfile);

module.exports = router;
