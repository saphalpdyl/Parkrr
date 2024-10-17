import mongoose from "mongoose";
import parkingLotSchema from "../../schemas/parkingLot";

const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema);

export default ParkingLot;