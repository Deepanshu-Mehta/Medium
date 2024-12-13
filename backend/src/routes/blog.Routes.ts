import { Hono } from "hono";
import {createPost, deletePost, getAllPosts, getPost, updatePost } from '../controllers/blog.controller';
import { authMiddleware } from '../middleware/auth.middleware';

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

// Apply auth middleware to protected routes
blogRouter.use('/*', authMiddleware());

blogRouter.post('/', createPost);
blogRouter.put('/', updatePost);
blogRouter.get('/:id', getPost);
blogRouter.get('/', getAllPosts); 
blogRouter.delete('/:id', deletePost);