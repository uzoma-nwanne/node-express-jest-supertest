import { connectDB } from './db/connection.js';
import  app from './app.js';
import dotenv from "dotenv";
import chalk from 'chalk';

//dotenv.config()
const port = process.env.PORT;

app.listen(port, ()=>{
    console.log(chalk.green.inverse('Server is up on Port ' + port))
    connectDB()
})