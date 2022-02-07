import express from 'express';
import { device } from '../controllers/device.js';
import { errorHandler } from '../../helpers/errorHandler.js';

export const deviceRoutes = express.Router();

deviceRoutes.post('/:deviceId', errorHandler(device.updateDevice));
