import express from "express";

import authController from "../controllers/authController.js";
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.get("/",authController.isLoggedIn, bookController.getBooks)
router.get("/:id",authController.isLoggedIn, bookController.getBook)


export default router;