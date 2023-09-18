import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { verifyUser, forAdmin } from '../middleware/authUser.js';

const router = express.Router();

router.get('/users', verifyUser, forAdmin, getUsers);
router.get('/users/:id', verifyUser, forAdmin, getUserById);
router.post('/users', verifyUser, forAdmin, createUser);
router.patch('/users/:id', verifyUser, forAdmin, updateUser);
router.delete('/users/:id', verifyUser, forAdmin, deleteUser);

export default router;
