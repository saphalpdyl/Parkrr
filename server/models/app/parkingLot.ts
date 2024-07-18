import mongoose, { Schema } from "mongoose";
import { IParkingLot } from "../../types";

const parkingLotSchema = new mongoose.Schema<IParkingLot>({
  notes: String,
  lat: Number,
  lon: Number,
  floors: [{
    default: [],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParkingFloor'
  }]
});

const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

export default ParkingLot;