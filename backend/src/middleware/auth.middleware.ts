import { Context, Next } from "hono";
import { verifyToken } from '../utils/jwt';

export const authMiddleware = () => {
  return async (c: Context, next: Next) => {
    const jwt = c.req.header('Authorization');
    if (!jwt) {
      c.status(401);
      return c.json({ error: "No token provided" });
    }
    
    try {
      const token = jwt.split(' ')[1];
      const payload = await verifyToken(token, c.env.JWT_SECRET);
      c.set('userId', payload.id);
      await next();
    } catch (error) {
      c.status(401);
      return c.json({ 
        error: "Authentication failed", 
        message: error instanceof Error ? error.message : 'Invalid token' 
      });
    }
  };
}