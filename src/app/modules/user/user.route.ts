import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/:userId', userController.getSingleuser);

router.put('/:userId/orders', userController.addOrder);
router.get('/:userId/orders', userController.getSingleuserorder);
router.post('/', userController.createUser);

router.get('/', userController.getAllusers);


export const userRoutes = router;
