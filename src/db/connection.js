import mongoose from "mongoose";
import dotenv from "dotenv";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config({ path: __dirname + `/../../config/${process.env.NODE_ENV}.env` })
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
