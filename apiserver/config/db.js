const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        // const conn = await mongoose.connect(process.env.MONGODB_URL);
        const connectionString = process.env.MONGO_DB_URL || 'mongodb://root:example@mongo:27017/backend?authSource=admin'
        const conn = await mongoose.connect(connectionString);
        console.log(`MONGODB CONNECTED: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;