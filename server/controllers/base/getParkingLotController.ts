import { ServiceError } from "../../errors/error";
import withErrorHandling from "../../errors/wrapper";
import { BaseService } from "../../services/baseService";
import { AuthenticatedRouteContext } from "../../types";

async function getParkingLotController(c: AuthenticatedRouteContext) {
  try {
    const parkingLotId = c.req.param("id");
    const parkingLot = await BaseService.getParkingLot(c.get("currentUser").id, parkingLotId);

    return c.json(parkingLot);
  } catch (e) {
    if ( e instanceof ServiceError ) {
      c.status(400);
      return c.json(e.toJSON);
    }

    return c.json({ message: "Internal Server Error"});
  }
}

export default withErrorHandling(getParkingLotController);