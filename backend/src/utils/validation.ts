import { z } from 'zod';

export const userSignupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be less than 50 characters")
});

export const userSigninSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});

export const postCreateSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z.string()
    .min(1, "Content is required")
    .max(10000, "Content must be less than 10000 characters")
});  