import { Request, Response } from 'express';
import { userService } from './user.service';
import { userValidation } from './user.validation';
import { UserModel } from './user.model';

//store user data into db

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

//read All users

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

//read single user

const getSingleuser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    if (await UserModel.isUserExists(userId)) {
      const result = await userService.getSingleuserDB(userId);
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        messages: 'something went wrong',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
    }
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

//update user information

const updateUser = async (req: Request, res: Response) => {
  try{
    const {userId} = req.params;
    const updateData = req.body;
    if(await UserModel.isUserExists(userId)){
      const validData = userValidation.parse(updateData);
      const result = await userService.updateUserDB(userId, validData)
      res.status(200).json({
        success:true,
        message:'user updated successfully',
        data:result
      })
    }else {
      res.status(404).json({
        success: false,
        messages: 'something went wrong',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
    }
  }catch(error){
    res.status(404).json({
      success: false,
      messages: 'something went wrong',
      error: {
        code: 404,
        description:error,
      },
    });
  }
}

//Delete user

const deleteUser = async function(req:Request, res:Response) {
   try{
      const {userId} = req.params
      if(await UserModel.isUserExists(userId)){
        const result = await userService.deleteUserDB(userId)
        res.status(200).json({
          success:true,
          message:'user deleted successfully',
          data:result
        })
      }else {
        res.status(404).json({
          success: false,
          messages: 'something went wrong',
          error: {
            code: 404,
            description: 'user not found',
          },
        });
      }
   }catch(error){
      res.status(404).json({
        success: false,
        messages: 'something went wrong',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
    }
}


//Add order into user order[]

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    if (await UserModel.isUserExists(userId)) {
      const result = await userService.addOrderDB(userId, userData);
      res.status(200).json({
        success: true,
        message: 'order created successfully!',
        data: userData,
      });
    } else {
      res.status(404).json({
        success: false,
        messages: 'order not created',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      messages: 'order not created',
      data: error,
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

//get all orders of specific user

const getSingleuserorder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (await UserModel.isUserExists(userId)) {
      const result = await userService.getSingleuserOrderDB(userId);
      res.status(200).json({
        success: true,
        message: 'order fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        messages: 'something went wrong',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      messages: 'something went wrong',
      data: error,
      error: {
        code: 404,
        description: error,
      },
    });
  }
};

//get total order price of specific uer

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (await UserModel.isUserExists(userId)) {
      const result = await userService.getTotalPriceDB(userId);
      res.status(200).json({
        success: true,
        message: 'total price fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        messages: 'something went wrong',
        error: {
          code: 404,
          description: 'user not found',
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      messages: 'something went wrong',
      data: error,
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
  updateUser,
  deleteUser,
  addOrder,
  getSingleuserorder,
  getTotalPrice,
};
