interface WorldObject {
  position: {
    x: number;
    y: number;
    z: number;
  };

  rotation: {
    x: number;
    y: number;
    z: number;
  };

  id : String;
}

export interface OtherObject extends WorldObject {
  color: String;
  args: [number, number, number];
}

export interface ParkingSpace extends WorldObject {
  occupied: boolean;
  type: String;
}


export interface ParkingFloor {
  floorPrefix: String;
  spaces: ParkingSpaces[];
  entrances?: OtherObject[];
  exits?: OtherObject[];
  Office?: OtherObject[];
}

export interface ParkingLot {
  notes ?: String;
  floors: ParkingFloor[];
}

export interface Organization {
  name: String;
  lots: ParkingLot[];
}