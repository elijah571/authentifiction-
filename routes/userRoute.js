import express from 'express';
import { loginUser, signUp, verifyAccount } from '../controllers/userController.js';

export const userRoute = express.Router()
//register user
userRoute.post('/signup', signUp)
//VERIFY ACCOUNT
userRoute.post('/verify-account', verifyAccount)
//Login Account
userRoute.post('/login', loginUser)