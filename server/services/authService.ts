import { sign, verify } from "hono/jwt";
import User, { IUser } from "../models/auth/user";
import { ErrorCode } from "../constants/enum";
import { AuthError } from "../errors/error";
import { JWTPayload } from "hono/utils/jwt/types";

export namespace AuthService {
  export interface UserRegisterData {
    firstName: string;
    lastName: string;
    middleName?: string;
    password: string;
    username: string;
  }
  
  export async function createUser(userData: UserRegisterData) : Promise<Omit<IUser, "password" | "parkingLots">> {
    // Search if the same username exists
    const userWithSameName = await User.find({
      username: userData.username,
    });
    
    if ( userWithSameName.length ) throw new AuthError("User already exists", ErrorCode.USER_ALREADY_EXISTS);

    const user = new User(userData); 
    
    // Create a password hash
    const { password } = userData;
    user.password = await Bun.password.hash(password);
    const newUser = await user.save();

    return prepareUserData(newUser);
  }

  export async function loginUser(username: string, password: string) {
    // Check if user exists
    const user = await User.findOne({ username: username });

    if ( !user ) throw new AuthError("User with that username doesn't exists ", ErrorCode.USER_DOES_NOT_EXISTS)
    
    // Check if password is valid
    const storedPassword = user.password;
    const isPasswordMatch = await Bun.password.verify(password, storedPassword);

    if ( !isPasswordMatch ) throw new AuthError("Password incorrect", ErrorCode.USER_PASSWORD_INCORRECT);

    user.lastLogin = Date.now();
    await user.save();

    const payload : JWTPayload = {
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 5,
      username: user.username,
    }
    
    const jwtToken = await sign(payload, process.env.JWT_SECRET!);

    return {jwtToken, userId: user._id, user: prepareUserData(user)};
  }

  export function prepareUserData(user: IUser) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      username: user.username,
      isActive: user.isActive,
      lastLogin: user.lastLogin,
    }
  }

  export async function verifyToken(token: string) {
    try {
      return await verify(token, process.env.JWT_SECRET!);
    } catch (e) {
      console.error(e);
      throw new AuthError("JWT malformed", ErrorCode.USER_JWT_MALFORMED);
    }
  }
}