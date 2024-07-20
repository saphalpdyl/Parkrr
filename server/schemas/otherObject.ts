import mongoose from "mongoose";
import { IOtherObject } from "../types";
import { positionSchema } from "./shared";

export const otherObjectSchema = new mongoose.Schema<IOtherObject>({
  position: {
    type: positionSchema,
    required: true,
  },
  rotation: {
    type: Number,
    required: true,
  },
  id: {
    type: String,
    unique: true,
    required: true,
  },
  args: {
    type: [Number, Number, Number],
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
});