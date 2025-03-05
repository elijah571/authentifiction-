import express from 'express';
import { deleteUserbyId, getAllUsers, getUserById, loginUser, logoutUser, resetPassword, resetPasswordToken, signUp, updateProfile, verifyAccount } from '../controllers/userController.js';
import { isAdmin, isAuthenticateUser } from '../middleware/authentification.js';

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
//update user and assign role by admin
// Route to update a user's profile and assign a role (only accessible to admin)
userRoute.put('/update-user-role/:userId', isAuthenticateUser, isAdmin, updateProfile); 
//Get All users
userRoute.get("/", isAuthenticateUser, isAdmin, getAllUsers)
//Get user by id
userRoute.get('/:userId', isAuthenticateUser, isAdmin, getUserById)
//Delete user
userRoute.delete('/delete/:userId', isAuthenticateUser, isAdmin, deleteUserbyId)