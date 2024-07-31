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
    color: "#03c04a"
  },
  "exit" : {
    height: 1,
    width: 3,
    color: "#ffa500"
  },
  "office" : {
    height: 5,
    width: 5,
    color: "#fff0"
  }
}