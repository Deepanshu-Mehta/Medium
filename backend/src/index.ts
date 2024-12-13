import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRouter } from './routes/user.Routes';
import { blogRouter } from './routes/blog.Routes';
import { errorHandler } from './middleware/error.middleware';


export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

app.get('/', (c) => {
  return c.json({ message: 'Hello,' });
  });
// Global middlewares
app.use('*', cors());
app.use('*', errorHandler());

// Route configurations
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app; 