import mongoose from "mongoose";
import { IParkingFloor } from "../../types";

const parkingFloorSchema = new mongoose.Schema<IParkingFloor>({
  floorPrefix: {
    required: true,
    type: String,
  },
  floorNumber: {
    type: Number,
    required: true,
  },
  spaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingSpace',
    default: [],
  }],
  entrances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OtherObject',
    default: [],
  }],
  exits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OtherObject',
    default: [],
  }],
  offices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OtherObject',
    default: [],
  }],
})

const ParkingFloor = mongoose.model('ParkingFloor', parkingFloorSchema);

export default ParkingFloor;