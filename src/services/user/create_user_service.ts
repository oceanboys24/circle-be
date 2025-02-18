import { Prisma } from "@prisma/client";
import { CreateUserDTO } from "../../dtos/user_dto";
import { prisma } from "../../libs/prisma";

export default async function CreateUserService(data: CreateUserDTO) {
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
