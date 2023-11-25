
import { Order, User } from './user.interface';
import { UserModel } from './user.model';

const createUserDB = async (user: User): Promise<User> => {
  const result = await UserModel.create(user);
  return result;
};

const getAllusersDB = async (): Promise<User[]> => {
  const result = await UserModel.find({}).select(
    'username fullName age email address',
  );
  return result;
  
};

const getSingleuserDB = async (userId: string): Promise<User | null> => {
  const result = await UserModel.findOne({ userId });
  return result;
};
const updateUserDB = async (
  userId: string,
  userData: User,
): Promise<User | null> => {
  const result = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteUserDB = async (userId: string): Promise<User | null> => {
  const result = await UserModel.findByIdAndDelete(userId);
  return result;
};

const addOrderDB = async (userId: string, orderData:Order): Promise<User | null>=> {
  console.log(orderData);
  
    const result = await UserModel.findOneAndUpdate({userId}, {$push:{orders:orderData}},{
      new: true,
      runValidators:true
    })
    return result

};
const getSingleuserOrderDB = async(userId: string)=>{
  const result = await UserModel.findOne({userId},{orders:1, _id:0})
  return result
}


export const userService = {
  createUserDB,
  getAllusersDB,
  getSingleuserDB,
  updateUserDB,
  deleteUserDB,
  addOrderDB,
  getSingleuserOrderDB
};
