import express from 'express';
import { auth } from '../controllers/auth.js';
import { errorHandler } from '../../helpers/errorHandler.js';

export const authRoutes = express.Router();

// ================================post routes
authRoutes.post('/login', errorHandler(auth.login));
authRoutes.post('/reset-password', errorHandler(auth.resetPassword));
authRoutes.post('/send-forgetPassword-email', errorHandler(auth.sendForgetPasswordEmail));
authRoutes.post('/forgetPassword/:id/:token', errorHandler(auth.forgetPassword));
authRoutes.post('/changePassword', errorHandler(auth.changePass));
