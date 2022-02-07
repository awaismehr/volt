import express from 'express';
import { user } from '../controllers/user.js';
import { errorHandler } from '../../helpers/errorHandler.js';

export const userRoutes = express.Router();

// get requests
userRoutes.get('/', errorHandler(user.getUsers));
userRoutes.get('/user/:id', errorHandler(user.getUser));

// post requests
userRoutes.post('/createUsers', errorHandler(user.createUsers));
userRoutes.post('/create', errorHandler(user.create));
userRoutes.get('/report/:id', errorHandler(user.report));

// put requests
userRoutes.put('/assignBay/:id', errorHandler(user.assignBay));
