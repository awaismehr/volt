import express from 'express';
import { bay } from '../controllers/index.js';
import { errorHandler } from '../../helpers/errorHandler.js';

export const bayRoutes = express.Router();

// get requests
bayRoutes.get('/:unitId', errorHandler(bay.findByUnitId));
