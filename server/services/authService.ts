import { verify, decode, sign } from 'hono/jwt';
import { HydratedDocument } from 'mongoose';
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
  
  export async function createUser(userData: UserRegisterData) : Promise<IUser> {
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

    return newUser as IUser;
  }

  export async function loginUser(username: string, password: string) {
    // Check if user exists
    const user = await User.findOne({ username: username });

    if ( !user ) throw new Error("User with that username doesn't exists ")
    
    // Check if password is valid
    const storedPassword = user.password;
    const isPasswordMatch = await Bun.password.verify(password, storedPassword);

    if ( !isPasswordMatch ) throw new AuthError("Password incorrect", ErrorCode.USER_PASSWORD_INCORRECT);

    const jwtToken = await sign({
      username: user.username,
      iat: Date.now(),
    }, process.env.JWT_SECRET!);

    return jwtToken;
  }
}