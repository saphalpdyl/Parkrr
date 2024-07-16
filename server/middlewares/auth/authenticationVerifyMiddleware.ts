import { AuthError } from "../../errors/error";
import { AuthService } from "../../services/authService";
import { ErrorCode } from "../../constants/enum";
import { createMiddleware } from 'hono/factory';

const authenticate = createMiddleware(async (c, next) => {
  try {
    const bearerToken = c.req.header("Authorization");

    if ( !bearerToken ) throw new AuthError("Missing bearer token", ErrorCode.USER_JWT_MISSING);
    
    const payload = await AuthService.verifyToken(bearerToken.split(" ")[1]);
    c.set("currentUser", payload);
    
    return next();
  } catch(e) {
    if ( e instanceof AuthError ) {
      c.status(403);
      return c.json(e.toJSON());
    }

    c.status(500);
    return c.json({ message: "Something went wrong!"});
  }
});

export default authenticate;