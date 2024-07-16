import { Hono } from 'hono';
import { handle } from 'hono/vercel';

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api/v1')


export default handle(app)