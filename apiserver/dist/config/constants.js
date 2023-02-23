"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TWILIO_PHONE_NUMBER = exports.TWILIO_AUTH_TOKEN = exports.TWILIO_ACC_SID = exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.SESSION_SECRET = exports.MONGO_DB_URL = exports.JWT_EXPIRES_IN = exports.NODE_ENV = exports.JWT_SECRET = exports.PORT = void 0;
exports.PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
exports.JWT_SECRET = process.env.JWT_SECRET || "this is max secret, you better hope there is a jwt secret in environment variables";
exports.NODE_ENV = process.env.NODE_ENV || "development";
exports.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "90d";
exports.MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://root:example@mongo:27017/backend?authSource=admin";
exports.SESSION_SECRET = process.env.SESSION_SECRET || "this is also max secret";
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.TWILIO_ACC_SID = process.env.TWILIO_ACC_SID;
exports.TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
exports.TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
//# sourceMappingURL=constants.js.map