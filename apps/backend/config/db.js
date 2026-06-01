import mongoose from "mongoose";

export const connectDB = async () => {

    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error("MONGO_URI is not defined");
        process.exit(1);
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("DB connection failed", error.message);
        process.exit(1);
    }
}