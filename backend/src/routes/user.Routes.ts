import { Hono } from "hono";
import {signin, signup } from '../controllers/user.controller';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);