import { JWTPayload } from "hono/utils/jwt/types";
import { IUser } from "../models/auth/user";
import { Context } from "hono";

interface IWorldObject {
  position: {
    x: number;
    y: number;
    z: number;
  };

  rotation: number;

  id : string;
  args: [number, number, number];
  editorData: object;
}

export interface IOtherObject extends IWorldObject {
  color: string;
}

export type ParkingSpaceType = "standard" | "handicap" | "vip" | "electric";

export interface IParkingSpace extends IWorldObject {
  occupied: boolean;
  type: ParkingSpaceType;
  bookings: IBooking[];
}

export interface IParkingFloor {
  floorPrefix: string;
  floorNumber: number;
  spaces: IParkingSpace[];
  entrances?: IOtherObject[];
  exits?: IOtherObject[];
  offices?: IOtherObject[];
}

export interface IParkingLot {
  notes ?: string;
  name ?: string;
  floors: IParkingFloor[];
  lat?: number;
  lon?: number;
}

export interface IBooking {
  createdOn: Date;
  estimatedEndTime?: Date;
  bookingRefId: string;
}

export interface CurrentUserInterface {
  tokenDetails: JWTPayload,
  id: string,
  user: IUser,
}

export type AuthenticatedRouteContext = Context<{ Variables: { currentUser: CurrentUserInterface }}>;