import { BaseService } from "../../services/baseService";
import { AuthenticatedRouteContext } from "../../types";

export default async function updateParkingLotController(c: AuthenticatedRouteContext) {
  const { updatedParkingLot, parkingLotId } = await c.req.json();

  return c.json(await BaseService.updateParkingLot(updatedParkingLot, parkingLotId, c.get("currentUser").id));
}