import { Hono } from 'hono'
import { cors } from "hono/cors";

import mongoose from "mongoose";
import signUpController from '../controllers/auth/signUpController';
import loginController from '../controllers/auth/loginController';
import authenticate from '../middlewares/auth/authenticationVerifyMiddleware';
import createNewParkingLotController from '../controllers/base/createNewParkingLotController';
import updateParkingLotController from '../controllers/base/updateParkingLotController';
import getParkingLotController from '../controllers/base/getParkingLotController';
import getAllParkingLotsController from '../controllers/base/getAllParkingLotsController';
import renameParkingLotController from '../controllers/base/renameParkingLotController';
import deleteParkingLotController from "../controllers/base/deleteParkingLotController";

const app = new Hono().basePath("/api/v1");
app.use('*', cors({
  origin: (origin, _) => origin,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include all methods your API uses
  allowHeaders: ['Content-Type', 'Authorization'], // Include headers your app sends
  maxAge: 600,
  credentials: true,
}));

mongoose.connect(process.env.MONGODB_URL!);

app.use("/app/*", authenticate);

/*
TODO:
  Delete Parking Lot
  Update Parking Lot
  Create Parking Floor
  Delete Parking Floor
  Update Parking Floor
  Read Parking Floor
  Create Parking Spaces
  Update Parking Spaces
  Delete Parking Spaces
  Read Parking Spaces
  Create Bookings
  Read Bookings
  Update Bookings
  Delete Bookings
  Create OtherObject
  Read OtherObject
  Delete OtherObject
  Update OtherObject  
*/

app.post("/app/lots/new/", createNewParkingLotController);
// app.post("/app/lots/update/", updateParkingLotController);
app.post("/app/lots/rename/", renameParkingLotController);
app.get("/app/lots/:id", getParkingLotController);
app.get("/app/lots/", getAllParkingLotsController);
app.delete("/app/lots/:id", deleteParkingLotController);

// Authentication
app.post("/auth/signup/", signUpController);
app.post("/auth/login/", loginController);
app.post("/auth/verify/", authenticate, c => {
  return c.json(c.get("currentUser" as any));
});

export default app;