const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");

router.put("/users/:userId/expenses/:expenseId", adminController.updateUserExpense);
router.get("/users/:userId/expenses/:expenseId", adminController.getUserExpense);

router.get("/users", authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get("/users/:id", authMiddleware, adminMiddleware, adminController.getUserDetails);
router.put("/users/:id", authMiddleware, adminMiddleware, adminController.updateUser);
router.delete("/users/:id", authMiddleware, adminMiddleware, adminController.deleteUser);

router.get("/users/:id/expenses", authMiddleware, adminMiddleware, adminController.getUserExpenses);
router.delete("/users/:id/expenses/:expenseId", authMiddleware, adminMiddleware, adminController.deleteUserExpense);

router.get("/users/:id/categories", authMiddleware, adminMiddleware, adminController.getUserCategories);
router.get("/users/:userId/categories/:categoryId", authMiddleware, adminMiddleware, adminController.getUserCategory);
router.put("/users/:id/categories/:categoryId", authMiddleware, adminMiddleware, adminController.updateUserCategory);
router.delete("/users/:id/categories/:categoryId", authMiddleware, adminMiddleware, adminController.deleteUserCategory);


module.exports = router;
