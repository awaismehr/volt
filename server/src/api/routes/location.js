import express from 'express';
import { location } from '../controllers/location.js';
import { errorHandler } from '../../helpers/errorHandler.js';

export const locationRoutes = express.Router();

locationRoutes.get('/', errorHandler(location.findAll));

locationRoutes.post('/', errorHandler(location.create));

locationRoutes.post('/change-location', errorHandler(location.changeLocation));
