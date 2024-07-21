import { BaseService } from "../../services/baseService";
import { AuthenticatedRouteContext } from "../../types";
import withErrorHandling from "../../errors/wrapper";

async function createNewParkingLotController(c: AuthenticatedRouteContext) {
  const parkingLot = await BaseService.createParkingLot(c.get("currentUser").id);
  
  return c.json(parkingLot);
}

export default withErrorHandling(createNewParkingLotController);