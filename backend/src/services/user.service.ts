import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from 'bcryptjs';
import { UserResponse, UserSigninInput, UserSignupInput } from '../models/user.model';

export const signup = async (
  input: UserSignupInput, 
  datasourceUrl: string
): Promise<UserResponse> => {
  const prismaClient = new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());

  try {
    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email: input.email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create user
    const user = await prismaClient.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true
      }
    });

    return user;
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const signin = async (
  input: UserSigninInput, 
  datasourceUrl: string
): Promise<UserResponse> => {
  const prismaClient = new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());

  try {
    // Find user
    const user = await prismaClient.user.findUnique({
      where: { email: input.email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      input.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email
    };
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};