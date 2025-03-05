import express from 'express';
import { signUp } from '../controllers/userController.js';

export const userRoute = express.Router()
//register user
userRoute.post('/signup', signUp)