import mongoose from "mongoose";
import { parkingSpaceSchema } from "../../schemas/parkingSpace";

const ParkingSpace = mongoose.model("ParkingSpace", parkingSpaceSchema);
export default ParkingSpace;