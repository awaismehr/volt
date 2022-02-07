import express from 'express';
import { notification } from '../controllers/index.js';
import { errorHandler } from '../../helpers/errorHandler.js';

export const notificationRoutes = express.Router();

// get requests
notificationRoutes.get('/', errorHandler(notification.findAll));
