import express from 'express';
import { organization } from '../controllers/organization.js';
import { errorHandler } from '../../helpers/errorHandler.js';
import { upload } from '../../middlewares/upload.js';

export const organizationRoutes = express.Router();

organizationRoutes.post('/', upload.single('file'), errorHandler(organization.update));
