import withErrorHandling from "../../errors/wrapper";
import { BaseService } from "../../services/baseService";
import { AuthenticatedRouteContext } from "../../types";

async function updateParkingLotController(c: AuthenticatedRouteContext) {
  const { updatedParkingLot, parkingLotId } = await c.req.json();

  return c.json(await BaseService.updateParkingLot(updatedParkingLot, parkingLotId, c.get("currentUser").id));
}

export default withErrorHandling(updateParkingLotController);