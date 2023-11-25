import { Model } from 'mongoose';

//import { User } from './user.interface';
//import { Schema, model, connect } from 'mongoose';

export type FullName = {
  firstName: string;
  lastName: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};
export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: Order[];
};

export interface UserModels extends Model<User>{
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId:string):Promise<User | null>
}
