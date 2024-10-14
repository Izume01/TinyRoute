import express from 'express';
import { handleRegistration, handleLogin } from '../controller/AuthController.js';
import { LoginCheck } from '../middleware/loginCheck.js';
const router = express.Router();

router.post('/register',  handleRegistration);
router.post('/login', handleLogin);

export default router;