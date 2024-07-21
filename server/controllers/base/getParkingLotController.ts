import { ServiceError } from "../../errors/error";
import withErrorHandling from "../../errors/wrapper";
import { BaseService } from "../../services/baseService";
import { AuthenticatedRouteContext } from "../../types";

async function getParkingLotController(c: AuthenticatedRouteContext) {
    const parkingLotId = c.req.param("id");
    const parkingLot = await BaseService.getParkingLot(c.get("currentUser").id, parkingLotId);

    return c.json(parkingLot);
}

export default withErrorHandling(getParkingLotController);