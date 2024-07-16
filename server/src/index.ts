import { Hono } from 'hono'

import mongoose from "mongoose";
import signUpController from '../controllers/auth/signUpController';
import loginController from '../controllers/auth/loginController';
import authenticate from '../middlewares/auth/authenticationVerifyMiddleware';

const app = new Hono().basePath("/api/v1");

mongoose.connect(process.env.MONGODB_URL!);

app.post("/auth/signup/", signUpController);
app.post("/auth/login/", loginController);
app.post("/auth/verify/", authenticate, c => {
  // @ts-ignore
  return c.json(c.get("currentUser"));
});

export default app;