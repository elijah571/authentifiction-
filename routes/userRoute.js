import express from 'express';
import { loginUser, logoutUser, resetPassword, resetPasswordToken, signUp, verifyAccount } from '../controllers/userController.js';
import { isAuthenticateUser } from '../middleware/authentification.js';

export const userRoute = express.Router()
//register user
userRoute.post('/signup', signUp)
//VERIFY ACCOUNT
userRoute.post('/verify-account', verifyAccount)
//Login Account
userRoute.post('/login', loginUser)
//Logout user
userRoute.post('/logout', logoutUser)
//reset password token request
userRoute.post('/resetToken', isAuthenticateUser, resetPasswordToken)
//reset Password
userRoute.put('/reset-password/:userId',isAuthenticateUser,  resetPassword);
