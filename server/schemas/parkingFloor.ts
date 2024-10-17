import mongoose from "mongoose";
import { IParkingFloor } from "../types";

export const parkingFloorSchema = new mongoose.Schema<IParkingFloor>({
  floorPrefix: {
    required: true,
    type: String,
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  spaces: [{
    type: mongoose.Schema.ObjectId,
    ref: "ParkingSpace",
  }],
  entrances: [{
    type: mongoose.Schema.ObjectId,
    ref: "OtherObject",
  }],
  exits: [{
    type: mongoose.Schema.ObjectId,
    ref: "OtherObject",
  }],
  offices: [{
    type: mongoose.Schema.ObjectId,
    ref: "OtherObject",
  }],
})