import { BaseService } from "../../services/baseService";
import { AuthenticatedRouteContext } from "../../types";

export default async function getAllParkingLotsController(c: AuthenticatedRouteContext) {
  return c.json(await BaseService.getAllParkingLotOfUser(c.get("currentUser").id));
}