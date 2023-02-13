import express from "express";

import authController from "../controllers/authController.js";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/logout", authController.logout)

router.get("/me", [authController.protect], userController.me)

router.get("/books", [authController.protect], userController.getUserBooks)
router.post("/books", [authController.protect], userController.addUserBook)
router.put("/books/:id", [authController.protect], userController.editUserBook)
router.delete("/books/:id", [authController.protect], userController.deleteBook)

router.get("/shelves", [authController.protect], userController.getUserShelves)
router.post("/shelves", [authController.protect], userController.addShelf)
router.put("/shelves/:id", [authController.protect], userController.editShelf)
router.delete("/shelves/:id", [authController.protect], userController.deleteShelf)
export default router;