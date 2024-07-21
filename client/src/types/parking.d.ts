interface WorldObject {
  position: {
    x: number;
    y: number;
    z: number;
  };

  rotation: number;

  id : String;
  args: [number, number, number];
}

export interface OtherObject extends WorldObject {
  color: String;
}

export type ParkingSpaceType = "standard" | "handicap" | "vip" | "electric";

export interface ParkingSpace extends WorldObject {
  occupied: boolean;
  type: ParkingSpaceType;
}

export interface ParkingFloor {
  floorPrefix: String;
  floorNumber: number;
  spaces: ParkingSpace[];
  entrances?: OtherObject[];
  exits?: OtherObject[];
  offices?: OtherObject[];
}

export interface ParkingLot {
  notes ?: String;
  floors: ParkingFloor[];
  lat?: number;
  lon?: number;
  _id?: string;
}