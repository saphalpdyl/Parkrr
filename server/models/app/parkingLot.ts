import mongoose from "mongoose";
import { IParkingLot } from "../../types";
import { parkingFloorSchema } from "../../schemas/parkingFloor";

const parkingLotSchema = new mongoose.Schema<IParkingLot>({
  notes: String,
  name: String,
  lat: Number,
  lon: Number,
  floors: {
    type: [parkingFloorSchema],
    default: [],
  },
});

const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

export default ParkingLot;