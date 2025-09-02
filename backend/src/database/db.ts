import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectDB() {
  try {
    const URL = process.env.MONGO_URI || "";
    await mongoose.connect(URL);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  }
}

export default connectDB;
