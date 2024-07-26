import { ParkingSpaceType } from "@/types/parking";

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