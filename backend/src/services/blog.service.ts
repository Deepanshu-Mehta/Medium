import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { BlogPostInput, BlogPostResponse } from '../models/blog.model';

export const createPost = async (
  input: BlogPostInput,
  authorId: string,
  datasourceUrl: string
): Promise<BlogPostResponse> => {
  const prismaClient = new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());

  try {
    return await prismaClient.post.create({
      data: {
        title: input.title,
        content: input.content,
        authorId: authorId
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true
      }
    });
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const updatePost = async (
  id: string,
  input: BlogPostInput,
  authorId: string,
  datasourceUrl: string
): Promise<BlogPostResponse> => {
  const prismaClient = new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());

  try {
    return await prismaClient.post.update({
      where: {
        id, 
        authorId
      },
      data: {
        title: input.title,
        content: input.content
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true
      }
    });
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const getPostById = async (
  id: string, 
  datasourceUrl: string
) => {
  const prismaClient = new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());

  try {
    const post = await prismaClient.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const getAllPosts = async (
  datasourceUrl: string
) => {
  const prismaClient = new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());

  try {
    return await prismaClient.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};

export const deletePost = async (
  id: string,
  authorId: string,
  datasourceUrl: string
) => {
  const prismaClient = new PrismaClient({
    datasourceUrl,
  }).$extends(withAccelerate());

  try {
    return await prismaClient.post.delete({
      where: { 
        id, 
        authorId 
      },
      select: {
        id: true
      }
    });
  } catch (error) {
    throw error;
  } finally {
    await prismaClient.$disconnect();
  }
};