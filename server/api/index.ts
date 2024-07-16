import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { AuthService } from '../services/authService';
import { AuthError } from '../errors/error';
import mongoose from 'mongoose';

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api/v1')

run();

async function run() {
  await mongoose.connect(process.env.MONGODB_URL!);

  app.post("/auth/signup/", async c => {
    const body = await c.req.json();
  
    try {
      await AuthService.createUser(body);
    } catch(e: any) {
      if ( e instanceof AuthError ) {
        return c.json(e.toJSON())
      }
    }
  })
}


export default handle(app)