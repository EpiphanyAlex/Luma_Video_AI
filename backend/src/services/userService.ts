import bcrypt from 'bcrypt';
import { findUserByEmail, createUser, CreateUserParams } from '../repositories/userRepository';

export const createUserService = async (payload: any) => {
  const email = payload?.email;
  const password = payload?.password;

  if (!email || !password) {
    const err: any = new Error('Invalid input: email and password are required');
    err.status = 400;
    throw err;
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    const err: any = new Error('User already exists');
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const createParams: CreateUserParams = {
    email,
    passwordHash,
    firstName: payload?.firstName ?? null,
    lastName: payload?.lastName ?? null,
  };

  const user = await createUser(createParams);

  // return only the created user's id for logging
  return { id: (user as any).id };
};
