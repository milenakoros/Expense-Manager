const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userCategoriesController = require("../controllers/userCategoriesController");

router.get("/", authMiddleware, userCategoriesController.getUserCategories);
router.get("/:id", authMiddleware, userCategoriesController.getUserCategory);
router.put("/:id", authMiddleware, userCategoriesController.updateCategory);
router.post("/", authMiddleware, userCategoriesController.addUserCategory);
//router.put("/:id/reassign", authMiddleware, userCategoriesController.reassignAndDeleteCategory);
router.delete("/:id", authMiddleware, userCategoriesController.deleteCategory);

module.exports = router;
