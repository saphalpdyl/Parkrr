import mongoose from "mongoose";
import { otherObjectSchema } from "../../schemas/otherObject";

const OtherObject = mongoose.model("OtherObject", otherObjectSchema);
export default OtherObject;