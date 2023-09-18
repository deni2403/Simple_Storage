import express from 'express';
import { Login, LoggedUser, Logout } from '../controllers/Auth.js';

const router = express.Router();

router.get('/me', LoggedUser);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router;
