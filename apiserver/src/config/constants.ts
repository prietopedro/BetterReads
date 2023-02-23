export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
export const JWT_SECRET = process.env.JWT_SECRET || "this is max secret, you better hope there is a jwt secret in environment variables"
export const NODE_ENV = process.env.NODE_ENV || "development"
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "90d"
export const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://root:example@mongo:27017/backend?authSource=admin"
export const SESSION_SECRET = process.env.SESSION_SECRET || "this is also max secret"
export const EMAIL_USER = process.env.EMAIL_USER
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
export const TWILIO_ACC_SID = process.env.TWILIO_ACC_SID
export const TWILIO_AUTH_TOKEN =  process.env.TWILIO_AUTH_TOKEN
export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER