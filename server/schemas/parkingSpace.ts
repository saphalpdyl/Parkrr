import mongoose from "mongoose";
import { IParkingSpace } from "../types";
import { positionSchema } from "./shared";
import { bookingSchema } from "./booking";

export const parkingSpaceSchema = new mongoose.Schema<IParkingSpace>({
  occupied: {
    default: false,
    type: Boolean,
  },
  type: {
    type: String,
    enum: ["standard", "handicap", "vip", "electric"],
  },
  rotation: {
    type: Number,
    required: true,
  },
  position: {
    type: positionSchema,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  args: {
    type: [Number, Number, Number],
    required: true,
  },
  editorData: {
    type: Object,
    required: true,
  },
  bookings: {
    type: [bookingSchema],
    default: [],
  }
});