import express from "express"
import userRoute from './route/user.js';

const app = express();

app.use(express.json());
app.use(userRoute);

export default app;