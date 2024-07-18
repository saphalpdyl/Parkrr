import mongoose from "mongoose";
import { IOtherObject } from "../../types";
import { positionSchema } from "./shared";

const otherObjectSchema = new mongoose.Schema<IOtherObject>({
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

const OtherObject = mongoose.model("OtherObject", otherObjectSchema);

export default OtherObject;