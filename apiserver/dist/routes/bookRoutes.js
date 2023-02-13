"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = __importDefault(require("../controllers/authController.js"));
const bookController_js_1 = __importDefault(require("../controllers/bookController.js"));
const router = express_1.default.Router();
router.get("/", authController_js_1.default.isLoggedIn, bookController_js_1.default.getBooks);
router.get("/:id", authController_js_1.default.isLoggedIn, bookController_js_1.default.getBook);
exports.default = router;
//# sourceMappingURL=bookRoutes.js.map