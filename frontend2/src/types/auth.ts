import { components } from './schema';

export interface UserType {
  username: string;
  fullName: string;
}

export type RegisterRequest = components['schemas']['RegisterRequest'];

export type LoginRequest = components['schemas']['LoginRequest'];