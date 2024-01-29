import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://abudxat:Abuthakir%401997@cluster0.qxccg.mongodb.net/", {
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log("error", error);
    }
}

export default connectDB;