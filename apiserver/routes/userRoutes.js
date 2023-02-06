const express = require("express");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/logout", authController.logout)

router.get("/me", [authController.protect], userController.me)

router.get("/books", [authController.protect], userController.getUserBooks)
router.post("/books", [authController.protect], userController.addUserBook)
router.put("/books/:id", [authController.protect], userController.editUserBook)

module.exports = router;