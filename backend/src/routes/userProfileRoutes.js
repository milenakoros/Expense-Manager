const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const userProfileController = require("../controllers/userProfileController");

router.put("/profile/change-password", authMiddleware, userProfileController.changePassword);
router.post("/profile/verify-password", authMiddleware, userProfileController.verifyPassword);
router.get("/profile", authMiddleware, userProfileController.getUserProfile);
router.put("/profile", authMiddleware, userProfileController.updateUserProfile);

module.exports = router;
