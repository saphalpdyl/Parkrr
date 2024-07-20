import { Context } from "hono";
import { BaseService } from "../../services/baseService";
import { IUser } from "../../models/auth/user";
import { AuthenticatedRouteContext } from "../../types";

export default async function createNewParkingLotController(c: AuthenticatedRouteContext) {
  const parkingLot = await BaseService.createParkingLot(c.get("currentUser").id);
  
  return c.json(parkingLot);
}