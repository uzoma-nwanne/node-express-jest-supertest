import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const dbURL = process.env.MONGODB_URL;
console.log(process.env.MONGODB_URL)
console.log(dbURL)


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURL);
    console.log(`connected to mongo db: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error" + error);
  }
};
