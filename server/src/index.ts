import { Hono } from 'hono'

import mongoose from "mongoose";
import signUpController from '../controllers/auth/signUpController';
import loginController from '../controllers/auth/loginController';
import authenticate from '../middlewares/auth/authenticationVerifyMiddleware';

import * as P from "../models/app";

const app = new Hono().basePath("/api/v1");

mongoose.connect(process.env.MONGODB_URL!);
P.ParkingFloor.find();

// Authentication
app.post("/auth/signup/", signUpController);
app.post("/auth/login/", loginController);
app.post("/auth/verify/", authenticate, c => {
  return c.json(c.get("currentUser" as any));
});

export default app;