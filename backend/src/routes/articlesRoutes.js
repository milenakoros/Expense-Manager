const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articlesController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware");

router.post("/articles", articleController.addArticle);
router.get("/articles", articleController.getArticles);
router.get("/articles/:id", articleController.getArticleById);

router.put("/articles/:id", authMiddleware, adminMiddleware, articleController.updateArticle);
router.delete("/articles/:id", authMiddleware, adminMiddleware, articleController.deleteArticle);

module.exports = router;
