export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
export const JWT_SECRET = process.env.JWT_SECRET || "this is max secret, you better hope there is a jwt secret in environment variables"
export const NODE_ENV = process.env.NODE_ENV || "development"
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "90d"