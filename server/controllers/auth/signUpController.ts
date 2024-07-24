import { Context } from "hono";
import { AuthService } from "../../services/authService";
import { AuthError } from "../../errors/error";
import { BaseService } from "../../services/baseService";

export default async function signUpController(c : Context) {
  const body: AuthService.UserRegisterData = await c.req.json();
  
  try {
    await AuthService.createUser(body);
    const { jwtToken, user, userId } = await AuthService.loginUser(body.username, body.password);

    // Create an empty parking lot for new user
    await BaseService.createParkingLot(userId.toString());

    return c.json({
      token: jwtToken,
      user,
    });
  } catch(e: any) {
    if ( e instanceof AuthError ) {
      c.status(400);
      return c.json(e.toJSON())
    }
  
    c.status(500);
    return c.json({
      message: "An unknown error occured",
    });
  }
}