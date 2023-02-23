"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../config/constants");
const nodemailer_1 = __importDefault(require("nodemailer"));
class NodeMailer {
    constructor() {
        console.log(constants_1.EMAIL_PASSWORD, constants_1.EMAIL_USER, "HEY", constants_1.PORT);
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false,
            auth: {
                user: constants_1.EMAIL_USER,
                pass: constants_1.EMAIL_PASSWORD, // generated ethereal password
            },
        });
    }
    async sendMail(to, subject, html) {
        this.transporter.sendMail({ to, subject, html, from: `BETTERREADS ${constants_1.EMAIL_USER}` }, (error, info) => {
            if (error)
                console.log(error);
            else
                console.log(info);
        });
    }
}
exports.default = NodeMailer;
//# sourceMappingURL=NodeMailer.js.map