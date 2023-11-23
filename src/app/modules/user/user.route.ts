import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);

router.get('/users', userController.getAllusers);

router.get('/users/:userId', userController.getSingleuser);

export const userRoutes= router;