import { verify, decode, sign } from 'hono/jwt';
import User, { IUser } from '../models/auth/user';
import { ErrorCode } from '../constants/enum';
import { AuthError } from '../../server/errors/error';

export namespace AuthService {
  export interface UserRegisterData {
    firstName: string;
    lastName: string;
    middleName?: string;
    password: string;
    username: string;
  }
  
  export async function createUser(userData: UserRegisterData) : Promise<Omit<IUser, "password">> {
    // Search if the same username exists
    const userWithSameName = await User.find({
      username: userData.username,
    });
    
    if ( userWithSameName.length ) throw new AuthError("User already exists", ErrorCode.USER_ALREADY_EXISTS);

    const user = new User(userData); 
    
    // Create a password hash
    const { password } = userData;
    const hashedPassword = await Bun.password.hash(password);

    user.password = hashedPassword;
    const newUser = await user.save();

    return prepareUserData(newUser);
  }

  export async function loginUser(username: string, password: string) {
    // Check if user exists
    const user = await User.findOne({ username: username });

    if ( !user ) throw new Error("User with that username doesn't exists ")
    
    // Check if password is valid
    const storedPassword = user.password;
    const isPasswordMatch = await Bun.password.verify(password, storedPassword);

    if ( !isPasswordMatch ) throw new AuthError("Password incorrect", ErrorCode.USER_PASSWORD_INCORRECT);

    user.lastLogin = Date.now();
    await user.save();

    const jwtToken = await sign({
      username: user.username,
      iat: Math.floor(Date.now() / 1000),
    }, process.env.JWT_SECRET!);

    return {jwtToken, user: prepareUserData(user)};
  }

  export function prepareUserData(user: IUser) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      username: user.username,
    }
  }

  export async function verifyToken(token: string) {
    try {
      const payload = await verify(token, process.env.JWT_SECRET!);

      return payload;
    } catch (e) {
      console.error(e);
      throw new AuthError("JWT malformed", ErrorCode.USER_JWT_MALFORMED);
    }
  }
}