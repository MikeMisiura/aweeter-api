import { Router } from 'express';
import { getUser, loginUser, createUser } from '../controllers/userController';

const router = Router();

// routes
router.post('/', createUser)
router.post('/login', loginUser)
router.get('/:id', getUser)

export default router;