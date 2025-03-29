import mongoose from "mongoose";
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

const NODE_ENV = process.env.NODE_ENV;
let dbURL;
let __filename;
let __dirname;
if (NODE_ENV && NODE_ENV !== "test") {
  __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  __dirname = path.dirname(__filename); // get the name of the directory
  dotenv.config({
    path: __dirname + `/../../config/${process.env.NODE_ENV}.env`,
  });
} else {
  dotenv.config();
}
dbURL = process.env.MONGODB_URL;
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURL);
    console.log(`connected to mongo db: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error" + error);
  }
};
