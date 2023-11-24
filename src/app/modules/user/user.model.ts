import mongoose from 'mongoose'
import {  Schema, model} from 'mongoose';
import { Address, FullName, Order, User } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../../app/config'

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const orderSchema = new Schema<Order>({
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
})

//user schema
export const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique:true },
  username: { type: String, required: true , unique:true},
  password: { type: String, required: true },
  fullName: {type:fullNameSchema, required:true},
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: true },
  address: {type:addressSchema, required:true},
  orders: {type:[orderSchema]},
});


//password hashing

userSchema.pre('save', async function(next){
  
    this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round));
    next();
})


//static method to check if user exist
userSchema.statics.isUserExists = async function(userId:string){
  const user = await this.findOne({userId : userId})
  return !!user;
}


//send specific response

userSchema.methods.toJSON = function(){
  const obj = this.toObject();
  delete obj.password;
  delete obj._id;
  
  return obj;
};
 
export const UserModel = model<User>('User', userSchema);



