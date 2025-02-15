import { CreateUserDTO } from "../dtos/user_dto";
import { prisma } from "../libs/prisma";

class UserService {
  async createUser(data: CreateUserDTO) {
    const user: CreateUserDTO = data;
    return await prisma.user.create({
      data: user,
    });
  }

  async getUserById(id: string) {
    return await prisma.user.findFirst({
      where: { id },
    });
  }
  async getAllUsers() {
    return await prisma.user.findMany();
  }
  async deleteUser(id: string) {
    return await prisma.user.delete({
        where : {id}
    })
  }
  async updateUser(id : string, data : CreateUserDTO){
    return await prisma.user.update({
        where : {id},
        data
    })
  }

}

export default new UserService();
