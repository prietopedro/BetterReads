"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = __importDefault(require("../controllers/authController.js"));
const userController_js_1 = __importDefault(require("../controllers/userController.js"));
const router = express_1.default.Router();
router.post("/signup", authController_js_1.default.signup);
router.post("/login", authController_js_1.default.login);
router.post("/otp", authController_js_1.default.requestOTPVerificationCode);
router.post("/logout", authController_js_1.default.logout);
router.get("/me", [authController_js_1.default.protect], userController_js_1.default.me);
router.get("/books", [authController_js_1.default.protect], userController_js_1.default.getUserBooks);
router.post("/books", [authController_js_1.default.protect], userController_js_1.default.addUserBook);
router.put("/books/:id", [authController_js_1.default.protect], userController_js_1.default.editUserBook);
router.delete("/books/:id", [authController_js_1.default.protect], userController_js_1.default.deleteBook);
router.get("/shelves", [authController_js_1.default.protect], userController_js_1.default.getUserShelves);
router.post("/shelves", [authController_js_1.default.protect], userController_js_1.default.addShelf);
router.put("/shelves/:id", [authController_js_1.default.protect], userController_js_1.default.editShelf);
router.delete("/shelves/:id", [authController_js_1.default.protect], userController_js_1.default.deleteShelf);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map