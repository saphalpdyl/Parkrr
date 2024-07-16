import { Hono } from 'hono'

import mongoose from "mongoose";
import signUpController from '../controllers/auth/signUpController';
import loginController from '../controllers/auth/loginController';

const app = new Hono();

mongoose.connect(process.env.MONGODB_URL!);

app.post("/auth/signup/", signUpController);
app.post("/auth/login/", loginController);

export default app
