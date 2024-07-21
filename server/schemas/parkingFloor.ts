import mongoose from "mongoose";
import { IParkingFloor } from "../types";
import { parkingSpaceSchema } from "./parkingSpace";
import { otherObjectSchema } from "./otherObject";

export const parkingFloorSchema = new mongoose.Schema<IParkingFloor>({
  floorPrefix: {
    required: true,
    type: String,
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  spaces: [parkingSpaceSchema],
  entrances: [otherObjectSchema],
  exits: [otherObjectSchema],
  offices: [otherObjectSchema],
})