interface IWorldObject {
  position: {
    x: number;
    y: number;
    z: number;
  };

  rotation: number;

  id : String;
  args: [number, number, number];
}

export interface IOtherObject extends IWorldObject {
  color: String;
}

export type ParkingSpaceType = "standard" | "handicap" | "vip" | "electric";

export interface IParkingSpace extends IWorldObject {
  occupied: boolean;
  type: ParkingSpaceType;
}

export interface IParkingFloor {
  floorPrefix: String;
  floorNumber: number;
  spaces: IParkingSpace[];
  entrances?: IOtherObject[];
  exits?: IOtherObject[];
  offices?: IOtherObject[];
}

export interface IParkingLot {
  notes ?: String;
  floors: IParkingFloor[];
  lat?: number;
  lon?: number;
}