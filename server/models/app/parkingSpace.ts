import mongoose from "mongoose";
import { IParkingSpace } from "../../types";
import { positionSchema } from "./shared";

const parkingSpaceSchema = new mongoose.Schema<IParkingSpace>({
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
    unique: true,
    required: true,
  },
  args: {
    type: [Number, Number, Number],
    required: true,
  }
});

const ParkingSpace = mongoose.model("ParkingSpace", parkingSpaceSchema);

export default ParkingSpace;