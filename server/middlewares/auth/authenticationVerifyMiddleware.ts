import { AuthError } from "../../errors/error";
import { AuthService } from "../../services/authService";
import { ErrorCode } from "../../constants/enum";
import { createMiddleware } from 'hono/factory';
import User, { IUser } from "../../models/auth/user";

const authenticate = createMiddleware(async (c, next) => {
  try {
    const bearerToken = c.req.header("Authorization");

    if ( !bearerToken ) throw new AuthError("Missing bearer token", ErrorCode.USER_JWT_MISSING);
    
    const payload = await AuthService.verifyToken(bearerToken.split(" ")[1]);
    
    // Get the corresponding user
    const username = payload.username as string;
    const user = await User.findOne({ username, });
    
    c.set("currentUser", {
      tokenDetails: payload,
      id: user!._id.toString(),
      ...AuthService.prepareUserData(user!),
    });
    
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