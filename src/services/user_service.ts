import { Prisma } from "@prisma/client";
import { CreateUserDTO } from "../dtos/user_dto";
import { prisma } from "../libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class UserService {
  async createUser(data: CreateUserDTO) {
    const userNameTaken = await prisma.user.findUnique({
      where : { userName : data.userName}
    })
    if(userNameTaken) {
      return {message : "Username already Taken"}
    }
    const CreateUser = await prisma.user.create({
      data
    })

    return {
      data : CreateUser
    }
  }

  async getUserById(id: string) {
    const resultUser = await prisma.user.findFirst({
      where: { id },
    });
    if (!resultUser) {
      return {message : "User Not Found"} 
    }
    return resultUser
  }
  async getAllUsers() {
    const resultAllUser = await prisma.user.findMany();
    if (!resultAllUser) {
      return {message : "User Not Found"}
    }
    return resultAllUser;
  }
  async deleteUser(id: string) {   
   try {
    await prisma.user.delete({
      where : {id}
    })
    return {
      status : 200,
      message : "Success Delete User"
    }
   } catch (err) {
      if(err instanceof PrismaClientKnownRequestError){
        if (err.code === 'P2025'){
          return {
            status : 404,
            message : "Record Not Found"
          }
        }
      } 
   }
  }
  async updateUser(id : string, data : CreateUserDTO){
    return await prisma.user.update({
        where : {id},
        data
    })
  }

}

export default new UserService();
