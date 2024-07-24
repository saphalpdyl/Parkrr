interface WorldObject {
  position: {
    x: number;
    y: number;
    z: number;
  };

  rotation: number;

  id : string;
  args: [number, number, number];
}

export interface OtherObject extends WorldObject {
  color: string;
}

export type ParkingSpaceType = "standard" | "handicap" | "vip" | "electric";

export interface ParkingSpace extends WorldObject {
  occupied: boolean;
  type: ParkingSpaceType;
}

export interface ParkingFloor {
  floorPrefix: string;
  floorNumber: number;
  spaces: ParkingSpace[];
  entrances?: OtherObject[];
  exits?: OtherObject[];
  offices?: OtherObject[];
}

export interface ParkingLot {
  notes ?: string;
  name ?: string;
  floors: ParkingFloor[];
  lat?: number;
  lon?: number;
  _id?: string;
}