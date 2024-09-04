import mongoose from "mongoose";
import { IBooking } from "../types";

export const bookingSchema = new mongoose.Schema<IBooking>({
  createdOn: {
    required: true,
    type: Date,
    default: Date.now,
  },
  estimatedEndTime: Date,
  bookingRefId: String,
});