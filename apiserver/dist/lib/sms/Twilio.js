"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../config/constants");
const twilio_1 = __importDefault(require("twilio"));
class TwilioImp {
    constructor() {
        this.client = (0, twilio_1.default)(constants_1.TWILIO_ACC_SID, constants_1.TWILIO_AUTH_TOKEN);
        this.phone = constants_1.TWILIO_PHONE_NUMBER;
    }
    async sendText(to, body) {
        const phone = this.phone;
        const message = await this.client.messages.create({
            body,
            to,
            from: phone
        });
        console.log(message);
    }
}
exports.default = TwilioImp;
//# sourceMappingURL=Twilio.js.map