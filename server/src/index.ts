import { Hono } from 'hono'

import mongoose from "mongoose";
import { AuthService } from '../services/authService';
import { AuthError } from '../errors/error';

const app = new Hono();

mongoose.connect(process.env.MONGODB_URL!);

app.post("/auth/signup/", async c => {
  const body: AuthService.UserRegisterData = await c.req.json();
  
  try {
    const { firstName, lastName, username } = await AuthService.createUser(body);
    const jwtToken = await AuthService.loginUser(body.username, body.username);
    
    return c.json({ firstName, lastName, username, token: jwtToken });
  } catch(e: any) {
    console.log(typeof e, e instanceof AuthError);
    // console.log(e);
    if ( e instanceof AuthError ) {
      c.status(400);
      return c.json(e.toJSON())
    }

    c.status(500);
    c.json({
      message: "An unknown error occured",
    });
    return;
  }
})

export default app
