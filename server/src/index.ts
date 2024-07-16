import { Hono } from 'hono'

import mongoose from "mongoose";
import { AuthService } from '../services/authService';
import { AuthError } from '../errors/error';

const app = new Hono();

run();

async function run() {
  await mongoose.connect(process.env.MONGODB_URL!);

  app.post("/auth/signup/", async c => {
    const body = await c.req.json();
  
    try {
      const user = await AuthService.createUser(body);
      return c.json({ user });
    } catch(e: any) {
      if ( e instanceof AuthError ) {
        return c.json(e.toJSON())
      }
    }
  })
}

export default app
