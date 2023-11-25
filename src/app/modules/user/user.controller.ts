
import { Request, Response } from 'express';
import { userService } from './user.service';
import {userValidation } from './user.validation';



//import  {UserModel } from './user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.users;
    const validData = userValidation.parse(user);
    const result = await userService.createUserDB(validData);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      messages: 'user created fail!',
      error: {
        code: 404,
        description: 'user created fail',
      },
    });
  }
};

const getAllusers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllusersDB();

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      messages: 'user not found!',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

const getSingleuser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const result = await userService.getSingleuserDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      messages: 'something went wrong',
      error: {
        code: 404,
        description: 'user not found',
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    console.log(userData);

    const result = await userService.addOrderDB(userId, userData);
    
    res.status(200).json({
      success: true,
      message: 'order created successfully!',
      data: result,
      
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      messages: 'something went wrong',
      data:error,
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

export const userController = {
  createUser,
  getAllusers,
  getSingleuser,
  addOrder,
};
