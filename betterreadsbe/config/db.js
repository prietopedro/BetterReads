const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        // const conn = await mongoose.connect(process.env.MONGODB_URL);
        const conn = await mongoose.connect('mongodb://mongo:27017/backend');
        console.log(`MONGODB CONNECTED: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;