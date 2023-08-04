import express from 'express';
import { get } from 'mongoose';
import { getPosts, getPostsBySearch, createPost, updatePost, deletePost} from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;