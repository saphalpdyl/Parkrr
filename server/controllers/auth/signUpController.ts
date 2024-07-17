import { Context } from "hono";
import { AuthService } from "../../services/authService";
import { AuthError } from "../../errors/error";

export default async function signUpController(c : Context) {
  const body: AuthService.UserRegisterData = await c.req.json();
  
  try {
    const { firstName, lastName, username } = await AuthService.createUser(body);
    const jwtToken = await AuthService.loginUser(body.username, body.username);
    
    return c.json({ firstName, lastName, username, token: jwtToken });
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