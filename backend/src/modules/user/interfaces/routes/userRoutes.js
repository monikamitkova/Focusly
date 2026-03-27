const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.patch("/:id/progress", userController.updateProgress);

module.exports = router;
