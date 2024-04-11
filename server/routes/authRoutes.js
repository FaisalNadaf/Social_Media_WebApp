import { login, register } from "../controllers/authController.js";
import express from 'express';


const router =express.Router();

router.post('/register',register)
router.post('/login',login)

export default router;