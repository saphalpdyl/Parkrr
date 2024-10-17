import mongoose from "mongoose";
import { IParkingLot } from "../types";

const parkingLotSchema = new mongoose.Schema<IParkingLot>({
  notes: String,
  name: String,
  lat: Number,
  lon: Number,
  floors: {
    type: [{
      type: mongoose.Schema.ObjectId,
      ref: "ParkingFloor"
    }],
    default: [],
  },
});

export default parkingLotSchema;