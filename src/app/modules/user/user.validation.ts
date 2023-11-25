import z from 'zod';
const fullNameSchemaZod = z.object({
  firstName: z.string({
    required_error: 'firstname is reuire',
    invalid_type_error: 'firstname must be a string',
  }),
  lastName: z.string({
    required_error: 'lastname is reuire',
    invalid_type_error: 'lastname must be a string',
  }),
});

// Address schema
const addressSchemaZod = z.object({
  street: z.string({ required_error: 'street is reuire' }),
  city: z.string({
    required_error: 'firstname is reuire',
    invalid_type_error: 'city must be a string',
  }),
  country: z.string({
    required_error: 'firstname is reuire',
    invalid_type_error: 'country must be a string',
  }),
});

// Order schema
export const orderSchemaZod = z.object({
  productName: z.string({ required_error: 'product name is reuire' }),
  price: z.number({
    required_error: 'price is reuire',
    invalid_type_error: 'price must be a number',
  }),
  quantity: z.number({
    required_error: 'uantity is reuire',
    invalid_type_error: 'uantity must be a number',
  }),
});

// User schema with Zod validation
const userValidation = z.object({
  userId: z.number({ required_error: 'userId is reuire' }).int().positive(),
  username: z
    .string({
      required_error: 'user name is reuire',
      invalid_type_error: 'username must be a string',
    })
    .min(3)
    .max(30),
  password: z.string({ required_error: 'password is reuire' }).min(6),
  fullName: fullNameSchemaZod,
  age: z.number({
    required_error: 'age is reuire',
    invalid_type_error: 'age must be a number',
  }),
  email: z
    .string({
      required_error: 'email is reuire',
      invalid_type_error: 'please write a valid email',
    })
    .email(),
  isActive: z.boolean(),
  hobbies: z
    .array(
      z.string({
        required_error: 'hobbies is reuired',
        invalid_type_error: 'hobbies must be string',
      }),
    )
    .min(1),
  address: addressSchemaZod,
  orders: z.array(orderSchemaZod).optional(),
});

export { userValidation };
