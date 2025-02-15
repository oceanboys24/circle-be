import { Prisma } from "@prisma/client";
import { RegisterUserDTO } from "../dtos/auth_dto";
import { prisma } from "../libs/prisma";

class AuthService {

  async GetUserByEmail(email: string) {
    try {
      const resultUser = await prisma.user.findUnique({
        where: { email },
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
  async LoginAuthService(email: string) {
    try {
      const resultUser = await prisma.user.findUnique({
        where: { email },
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
  async GetAuthUserById(id: string) {
    try {
      const resultUser = await prisma.user.findUnique({
        where: { id },
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
  async CreateRegisterAuth(data: RegisterUserDTO) {
    try {
      const registerAuth = await prisma.user.create({ data });
      return {
        status: 201,
        message: "Success Create",
        data: registerAuth,
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            status: 409,
            message: "Username/Email Already Taken",
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
  async ResetPasswordAuth(email: string, hashedNewPassword: string) {
    return await prisma.user.update({
      where: { email },
      data: {
        password: hashedNewPassword,
      },
    });
  }
}

export default new AuthService();
