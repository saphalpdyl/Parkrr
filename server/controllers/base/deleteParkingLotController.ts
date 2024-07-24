import {AuthenticatedRouteContext} from "../../types";
import {BaseService} from "../../services/baseService";
import withErrorHandling from "../../errors/wrapper";

async function deleteParkingLotController(c : AuthenticatedRouteContext) {
    const { parkingLotId } = await c.req.json<{ parkingLotId: string}>();

    return c.json(await BaseService.deleteParkingLot(parkingLotId, c.get("currentUser").id));
}

export default withErrorHandling(deleteParkingLotController);