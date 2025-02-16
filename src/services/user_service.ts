import { Prisma } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user_dto";
import { prisma } from "../libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

class UserService {
  async createUser(data: CreateUserDTO) {
    try {
      const userCreate = await prisma.user.create({ data });
      return {
        status: 201,
        message: "Success Create",
        data: userCreate,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            status: 409,
            message: "Username Already Taken",
            field: error.meta?.target,
          };
        }
      }
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }

  async getUserById(id: string) {
    try {
      const resultUser = await prisma.user.findUnique({
        where: { id },
        include: {
          profile: true,
        },
      });
      if (!resultUser) {
        return { status: 404, message: "User Not Found" };
      }
      return {
        status: 200,
        message: "Record Found",
        data: resultUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }

  async getAllUsers() {
    try {
      const resultAllUser = await prisma.user.findMany({
        include: {
          profile: true,
        },
      });
      

      if (resultAllUser.length === 0) {
        return { status: 404, message: "User Not Found" };
      }

      return {
        status: 200,
        message: "Users Found",
        data: resultAllUser,
      };

    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }

  async deleteUser(id: string) {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id },
      });
      return {
        status: 200,
        message: "Success Delete User",
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          return {
            status: 404,
            message: "Record Not Found",
          };
        }
      }
    }
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    try {
      const userUpdate = await prisma.user.findUnique({
        where: { id },
      });
      if (!userUpdate) {
        return {
          status: 404,
          message: "Record Not Found",
        };
      }

      // Check Data is Update or Not
      const isDataSame = Object.keys(data).every(
        (key) => (data as any)[key] === (userUpdate as any)[key]
      );

      if (isDataSame) {
        return {
          status: 200,
          message: "Not updated yet",
        };
      }

      const updatedUser = await prisma.user.update({
        where: { id },
        data,
      });

      return {
        status: 200,
        message: "Success Update User",
        data: updatedUser,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
}

export default new UserService();
