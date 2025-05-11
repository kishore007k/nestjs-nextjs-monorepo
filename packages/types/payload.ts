import { UserType } from './dto';

export type CreateUserPayload = Pick<UserType, 'name' | 'email' | 'password'>;
export type GetUserPayload = { userId: string };
export type UpdateUserPayload = Pick<UserType, 'id' | 'name'>;
export type DeleteUserPayload = { userId: string };
export type GetAllUsersPayload = { page: number; limit: number };
export type UserDataPayload = UserType;
