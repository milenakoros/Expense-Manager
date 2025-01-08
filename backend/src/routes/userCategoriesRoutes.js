const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getUserCategories,
  addUserCategory,
} = require("../controllers/userCategoriesController");

router.get("/", authMiddleware, getUserCategories);
router.post("/", authMiddleware, addUserCategory);

module.exports = router;
