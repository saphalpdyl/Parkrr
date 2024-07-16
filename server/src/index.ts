import { Hono } from 'hono'

import mongoose from "mongoose";
import signUpController from '../controllers/auth/signUpController';

const app = new Hono();

mongoose.connect(process.env.MONGODB_URL!);

app.post("/auth/signup/", signUpController);

export default app
