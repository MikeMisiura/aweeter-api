import { Router } from 'express';
import { getAllMessages, getMessage, createMessage, updateMessage, deleteMessage } from '../controllers/messageController';

const router = Router();

// routes
router.get('/', getAllMessages);
router.post('/', createMessage);
router.get('/:id', getMessage);
router.put('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;