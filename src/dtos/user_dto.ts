import { Profile, User } from "@prisma/client";


export type CreateUserDTO = Pick<User, 'userName' | 'fullName' | 'password' | 'email'> 
export type UpdateUserDTO = Pick<User, 'userName' | 'fullName' | 'password' | 'email'> 