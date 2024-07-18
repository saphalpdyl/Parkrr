import { Context } from "hono";
import { AuthError } from "../../errors/error";
import { AuthService } from "../../services/authService";

interface LoginRequestData {
  username: string;
  password: string;
}

export default async function loginController(c: Context) {
  try {
    const { username, password } : LoginRequestData = await c.req.json()

    const { jwtToken, user } = await AuthService.loginUser(username, password)

    return c.json({
      token: jwtToken,
      user,
    });
  } catch(e) {
    console.log(e);
    if ( e instanceof AuthError ) {
      c.status(400);
      return c.json(e.toJSON());
    }

    c.status(500);
    return c.json({ message: "Something went wrong!"});
  }
}