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
const updateUserDB = async (userId: string, userData: User) => {
  const result = await UserModel.findOneAndUpdate(
    { userId: userId },
    userData,
    { $set: userData, runValidators: true, new: true },
  ).select('-password');
  return result;
};

const deleteUserDB = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const addOrderDB = async (
  userId: string,
  orderData: Order,
): Promise<User | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};
const getSingleuserOrderDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId }, { orders: 1, _id: 0 });
  return result;
};

const getTotalPriceDB = async (userId: string) => {
  const result = await UserModel.aggregate([
    { $match: { userId: parseInt(userId) } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.quantity', '$orders.price'] },
        },
      },
    },
  ]);

  return result;
};

export const userService = {
  createUserDB,
  getAllusersDB,
  getSingleuserDB,
  updateUserDB,
  deleteUserDB,
  addOrderDB,
  getSingleuserOrderDB,
  getTotalPriceDB,
};
