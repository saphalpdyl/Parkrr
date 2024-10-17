import mongoose from "mongoose";
import { bookingSchema } from "../../schemas/booking";

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;