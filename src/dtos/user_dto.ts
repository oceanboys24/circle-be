import { User } from "@prisma/client";


export type CreateUserDTO = Pick<User, 'userName' | 'fullName' | 'password'> 
export type UpdateUserDTO = Pick<User, 'userName' | 'fullName' | 'password'> 