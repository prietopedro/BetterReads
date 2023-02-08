const express = require("express");

const authController = require("../controllers/authController");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.get("/",authController.isLoggedIn, bookController.getBooks)
router.get("/:id",authController.isLoggedIn, bookController.getBook)


module.exports = router;