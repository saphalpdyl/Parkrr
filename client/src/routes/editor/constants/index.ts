import { ParkingSpaceType } from "../../../types/parking";
import { ItemSize, ParkingItemCategory } from "../types";

export const SIZE_FACTOR = 20;

export const itemSizes : Record<ParkingItemCategory, ItemSize> = {
  "space" : {
    height: 3,
    width: 5,
    color: "#ffffff"
  },
  "entrance" : {
    height: 1,
    width: 3,
    color: "#ffa500"
  },
  "exit" : {
    height: 1,
    width: 3,
    color: "#03c04a"
  },
  "office" : {
    height: 5,
    width: 5,
    color: "#fff0"
  }
}

export const parkingSpacesProperties : {
  spaceType: ParkingSpaceType,
  color: string,
  border ?: boolean,
}[] = [
  {
    spaceType: "standard",
    color: "#fff",
    border: true,
  },
  {
    spaceType: "electric",
    color: "#00917c",
  },
  {
    spaceType: "handicap",
    color: "#1d63dc",
  },
  {
    spaceType: "vip",
    color: "#ab2330",
  },
];