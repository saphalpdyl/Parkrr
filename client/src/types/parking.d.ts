interface WorldObject {
  position: vec3;

  rotation: number;

  id : string;
  args: [number, number, number];
}

export interface OtherObject extends WorldObject {
  color: string;
}

export type ParkingSpaceType = "standard" | "handicap" | "vip" | "electric";

export interface IParkingSpace extends WorldObject {
  occupied: boolean;
  type: ParkingSpaceType;
  bookings: IBooking[];
}

export interface IParkingFloor {
  floorPrefix: string;
  floorNumber: number;
  spaces: IParkingSpace[];
  entrances?: OtherObject[];
  exits?: OtherObject[];
  offices?: OtherObject[];
}

export interface IParkingLot {
  notes ?: string;
  name ?: string;
  floors: IParkingFloor[];
  lat?: number;
  lon?: number;
  _id?: string;
}

export interface IBooking {
  createdOn: Date;
  estimatedEndTime?: Date;
  bookingRefId: string;
}