import withErrorHandling from "../../errors/wrapper";
import { BaseService } from "../../services/baseService";
import { AuthenticatedRouteContext } from "../../types";

async function renameParkingLotController(c: AuthenticatedRouteContext) {
  const { name, parkingLotId} = await c.req.json();
  
  return c.json(await BaseService.renameParkingLot(name, parkingLotId, c.get("currentUser").id!));
}
export default withErrorHandling(renameParkingLotController);