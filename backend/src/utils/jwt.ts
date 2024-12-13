import { sign, verify } from "hono/jwt";

export interface JwtPayload {
  id: string;
  exp?: number;
}

export const generateToken = async (
  payload: JwtPayload,
  secret: string,
  expiresIn: string = '7d' 
): Promise<string> => { 
  return await sign(
    {
      id: payload.id,
      exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
    },
    secret
  );
}

export const verifyToken = async (
  token: string,
  secret: string
): Promise<JwtPayload> => {
  try {
    const decoded = await verify(token, secret);
    
    // Type guard to ensure id exists
    if (typeof decoded !== 'object' || !decoded || !('id' in decoded)) {
      throw new Error('Invalid token structure');
    }

    return {
      id: decoded.id as string,
      exp: decoded.exp as number | undefined
    };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}