import mongoose from "mongoose";
import { parkingFloorSchema } from "../../schemas/parkingFloor";

const ParkingFloor = mongoose.model("ParkingFloor", parkingFloorSchema);
export default ParkingFloor;