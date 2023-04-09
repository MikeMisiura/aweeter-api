import { Router } from 'express';
import { getUser, getCurrentUser, loginUser, createUser, editUser, getUserIdByUsername } from '../controllers/userController';

const router = Router();

// routes
router.post('/', createUser)
router.post('/login', loginUser)
router.get('/profile/:id', getUser)
router.get('/:id', getCurrentUser)
router.get('/username/:username', getUserIdByUsername)
router.put('/:id', editUser)


export default router;