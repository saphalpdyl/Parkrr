import { Hono } from 'hono'
import { cors } from "hono/cors";

import mongoose from "mongoose";
import signUpController from '../controllers/auth/signUpController';
import loginController from '../controllers/auth/loginController';
import authenticate from '../middlewares/auth/authenticationVerifyMiddleware';
import createNewParkingLotController from '../controllers/base/createNewParkingLotController';
import updateParkingLotController from '../controllers/base/updateParkingLotController';

const app = new Hono().basePath("/api/v1");
app.use('*', cors({
  origin: (origin, c) => origin,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include all methods your API uses
  allowHeaders: ['Content-Type', 'Authorization'], // Include headers your app sends
  maxAge: 600,
  credentials: true,
}));

mongoose.connect(process.env.MONGODB_URL!);

app.use("/app/*", authenticate);

app.post("/app/new/", createNewParkingLotController);

// Authentication
app.post("/auth/signup/", signUpController);
app.post("/auth/login/", loginController);
app.post("/auth/verify/", authenticate, c => {
  return c.json(c.get("currentUser" as any));
});

export default app;