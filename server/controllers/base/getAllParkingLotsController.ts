import withErrorHandling from "../../errors/wrapper";
import { BaseService } from "../../services/baseService";
import { AuthenticatedRouteContext } from "../../types";

async function getAllParkingLotsController(c: AuthenticatedRouteContext) {
  return c.json(await BaseService.getAllParkingLotOfUser(c.get("currentUser").id));
}

export default withErrorHandling(getAllParkingLotsController);