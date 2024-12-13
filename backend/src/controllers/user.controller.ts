import { Context } from 'hono';
import { userSignupSchema, userSigninSchema } from '../utils/validation';
import * as UserService from '../services/user.service';
import * as JwtUtils from '../utils/jwt';

export const signup = async (c: Context) => {
  try {
    const body = await c.req.json();
    const validatedData = userSignupSchema.parse(body);

    // Ensure DATABASE_URL is available
    if (!c.env?.DATABASE_URL) {
      throw new Error('Database URL is not configured');
    }

    // Create user
    const user = await UserService.signup(
      validatedData, 
      c.env.DATABASE_URL
    );

    // Generate JWT
    const token = await JwtUtils.generateToken(
      { id: user.id },
      c.env.JWT_SECRET
    );

    return c.json({
      user,
      jwt: token
    }, 201);
  } catch (error: any) {
    console.error('Signup error:', error);
    c.status(400);
    return c.json({
      error: "Signup failed",
      message: error.message
    });
  }
};

export const signin = async (c: Context) => {
  try {
    const body = await c.req.json();
    const validatedData = userSigninSchema.parse(body);

    // Ensure DATABASE_URL is available
    if (!c.env?.DATABASE_URL) {
      throw new Error('Database URL is not configured');
    }

    // Authenticate user
    const user = await UserService.signin(
      validatedData, 
      c.env.DATABASE_URL
    );

    // Generate JWT
    const token = await JwtUtils.generateToken(
      { id: user.id },
      c.env.JWT_SECRET
    );

    return c.json({
      user,
      jwt: token
    });
  } catch (error: any) {
    console.error('Signin error:', error);
    c.status(403);
    return c.json({
      error: "Signin failed",
      message: error.message
    });
  }
};