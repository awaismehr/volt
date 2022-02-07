import express from 'express';
import { unit } from '../controllers/index.js';
import { errorHandler } from '../../helpers/errorHandler.js';

export const unitRoutes = express.Router();

// get requests
unitRoutes.get('/findAll', errorHandler(unit.findAll));
