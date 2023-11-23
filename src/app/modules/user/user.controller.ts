import { Request, Response} from 'express';
import { userService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.users;
    const result = await userService.createUserDB(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllusers = async (req:Request, res:Response)=>{
    try{
        const result = await userService.getAllusersDB();
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully!',
            data: result,
          });
    }catch(error){
        console.log(error);
    }
}


const getSingleuser = async (req: Request, res:Response)=>{
    try{
        const userId =req.params.userId;
        const result = await userService.getSingleuserDB(userId);
        res.status(200).json({
            success: true,
            message: 'User retrieved successfully!',
            data: result,
          });
    }catch(error){
        console.log(error);
    }
}



export const userController = {
  createUser,
  getAllusers,
  getSingleuser
};
