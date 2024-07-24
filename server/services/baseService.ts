import mongoose from "mongoose";
import {ErrorCode} from "../constants/enum";
import {ServiceError} from "../errors/error";
import {ParkingLot} from "../models/app";
import User from "../models/auth/user";
import {IParkingLot} from "../types";

export namespace BaseService {
  async function _getUserById(userId: string) {
    const user = await User.findById(userId);
  
    if ( !user ) throw new ServiceError("Couldn't find user", ErrorCode.SYSTEM_ITEM_NOT_FOUND);

    return user;
  }

  export async function getAllParkingLotOfUser(userId: string) {
    const user = await _getUserById(userId);
    return ParkingLot.find({
      '_id': {
        $in: user.parkingLots,
      }
    }, 'name _id');
  }

  export async function getParkingLot(userId: string, parkingLotId: string) {
    const user = await _getUserById(userId);

    const parkingLot = await ParkingLot.findById(parkingLotId);

    if ( !parkingLot ) throw new ServiceError("Couldn't find corresponding parking lot", ErrorCode.SYSTEM_ITEM_NOT_FOUND);

    // Check if parking lot belongs to the user
    const isParkingLotOfUser = user.parkingLots.includes(new mongoose.Types.ObjectId(parkingLotId));
    if ( !isParkingLotOfUser ) throw new ServiceError("Not Authorized", ErrorCode.SYSTEM_USER_NOT_AUTHORIZED);

    return parkingLot;
  }
  
  export async function createParkingLot(userId: string) {
    const user = await _getUserById(userId);
    const parkingLot = new ParkingLot({
      floors: [],
    });
    
    
    const savedParkingLot = await parkingLot.save();

    user.parkingLots.push(savedParkingLot._id);
    await user.save();

    return savedParkingLot;
  }

  export async function updateParkingLot(parkingLotData: IParkingLot, parkingLotId: string, userId: string) {
    const user = await _getUserById(userId);

    if (!(parkingLotId && user.parkingLots.includes(new mongoose.Types.ObjectId(parkingLotId)))) {
      throw new ServiceError("Couldn't find the corresponding parking lot", ErrorCode.PAYLOAD_ITEM_NOT_FOUND);
    }

    return ParkingLot.findByIdAndUpdate(parkingLotId, parkingLotData);
  }

  export async function renameParkingLot(newName: string, parkingLotId: string, userId: string) {
    const user = await _getUserById(userId);

    if (!(parkingLotId && user.parkingLots.includes(new mongoose.Types.ObjectId(parkingLotId)))) {
      throw new ServiceError("Couldn't find the corresponding parking lot", ErrorCode.PAYLOAD_ITEM_NOT_FOUND);
    }

    return ParkingLot.findByIdAndUpdate(parkingLotId, {
      name: newName,
    });
  }

  export async function deleteParkingLot(parkingLotId: string, userId: string) {
    const user = await _getUserById(userId);

    await user.updateOne({
      $pull: {
        parkingLots: parkingLotId
      }
    }, { new: true });

    await ParkingLot.findByIdAndDelete(parkingLotId);

    return {
      success: true,
      id: parkingLotId,
    }
  }
}