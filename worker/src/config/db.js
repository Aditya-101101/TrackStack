import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Worker MongoDB connected");
  } catch (error) {
    console.error("Worker MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;