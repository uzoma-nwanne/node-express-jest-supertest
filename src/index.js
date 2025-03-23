import { connectDB } from './db/connection.js';
import  app from './app.js';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

dotenv.config({ path: __dirname + `/../config/${process.env.NODE_ENV}.env` })
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log('Server is up on Port ' + port)
    connectDB()
})