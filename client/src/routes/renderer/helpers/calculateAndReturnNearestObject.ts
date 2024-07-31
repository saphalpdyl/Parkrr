import { OtherObject } from "@/types/parking";
import { calculateDistance } from "@/utils";

export default function calculateAndReturnNearestObject(point: vec3, entrances: OtherObject[]) {
  const entranceData = entrances.map(e => ({e, pos: e.position}));

  let nearestObject: OtherObject | null = null;
  let shortestDistance = Infinity;

  for ( const data of entranceData) {
    const { e, pos} = data;
    if ( calculateDistance(point, pos) < shortestDistance ) {
      nearestObject = e;
      shortestDistance = calculateDistance(point, pos);
    }
  }

  return {
    nearestObject,
    shortestDistance,
  };
}