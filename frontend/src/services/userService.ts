import { post } from '../utils/request';
import type { CreateUserInput } from '../../../shared/src/index';

export const createUser = async (payload: CreateUserInput) => {
  return post('/api/users', payload);
};

export default { createUser };
