import { Router } from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Public routes - Anyone can view posts
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected routes - Only authenticated users can create/update/delete
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router;
