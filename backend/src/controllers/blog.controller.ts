import { Context } from 'hono';
import { postCreateSchema } from '../utils/validation';
import * as BlogService from '../services/blog.service';

export const createPost = async (c: Context) => {
  try {
    // Get authenticated user ID
    const userId = c.get('userId');

    // Ensure DATABASE_URL is available
    if (!c.env?.DATABASE_URL) {
      throw new Error('Database URL is not configured');
    }

    // Parse and validate input
    const body = await c.req.json();
    const validatedData = postCreateSchema.parse(body);

    // Create post
    const post = await BlogService.createPost(
      validatedData, 
      userId,
      c.env.DATABASE_URL
    );

    return c.json(post, 201);
  } catch (error: any) {
    console.error('Create post error:', error);
    c.status(400);
    return c.json({
      error: "Post creation failed",
      message: error.message
    });
  }
};

export const updatePost = async (c: Context) => {
  try {
    // Get authenticated user ID
    const userId = c.get('userId');

    // Ensure DATABASE_URL is available
    if (!c.env?.DATABASE_URL) {
      throw new Error('Database URL is not configured');
    }

    // Parse and validate input
    const body = await c.req.json();
    const validatedData = postCreateSchema.parse(body);

    // Update post
    const post = await BlogService.updatePost(
      body.id,
      validatedData, 
      userId,
      c.env.DATABASE_URL
    );

    return c.json(post);
  } catch (error: any) {
    console.error('Update post error:', error);
    c.status(400);
    return c.json({
      error: "Post update failed",
      message: error.message
    });
  }
};

export const getPost = async (c: Context) => {
  try {
    // Ensure DATABASE_URL is available
    if (!c.env?.DATABASE_URL) {
      throw new Error('Database URL is not configured');
    }

    const id = c.req.param('id');

    const post = await BlogService.getPostById(
      id,
      c.env.DATABASE_URL
    );

    return c.json(post);
  } catch (error: any) {
    console.error('Get post error:', error);
    c.status(404);
    return c.json({
      error: "Post retrieval failed",
      message: error.message
    });
  }
};

export const getAllPosts = async (c: Context) => {
  try {
    // Ensure DATABASE_URL is available
    if (!c.env?.DATABASE_URL) {
      throw new Error('Database URL is not configured');
    }

    const posts = await BlogService.getAllPosts(
      c.env.DATABASE_URL
    );

    return c.json(posts);
  } catch (error: any) {
    console.error('Get all posts error:', error);
    c.status(500);
    return c.json({
      error: "Failed to retrieve posts",
      message: error.message
    });
  }
};

export const deletePost = async (c: Context) => {
  try {
    // Get authenticated user ID
    const userId = c.get('userId');

    // Ensure DATABASE_URL is available
    if (!c.env?.DATABASE_URL) {
      throw new Error('Database URL is not configured');
    }

    const id = c.req.param('id');

    await BlogService.deletePost(
      id,
      userId,
      c.env.DATABASE_URL
    );

    return c.json({ message: "Post deleted successfully" }, 200);
  } catch (error: any) {
    console.error('Delete post error:', error);
    c.status(400);
    return c.json({
      error: "Post deletion failed",
      message: error.message
    });
  }
};