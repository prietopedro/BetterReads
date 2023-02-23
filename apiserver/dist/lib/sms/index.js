"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Twilio_1 = __importDefault(require("./Twilio"));
const smsSender = new Twilio_1.default();
exports.default = smsSender;
//# sourceMappingURL=index.js.map