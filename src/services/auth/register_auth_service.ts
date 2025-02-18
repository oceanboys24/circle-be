import { RegisterUserDTO } from "../../dtos/auth_dto";
import { prisma } from "../../libs/prisma";
import { Prisma } from "@prisma/client";

export default async function CreateRegisterAuth(data: RegisterUserDTO) {
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
