import { Context, Next } from "hono";

export function errorHandler() {
  return async (c: Context, next: Next) => {
    try {
      await next();
    } catch (err: any) {
      console.error(err);
      c.status(err.status || 500);
      return c.json({ 
        error: 'Internal Server Error', 
        message: err instanceof Error ? err.message : 'Unknown error' 
      });
    }
  };
}