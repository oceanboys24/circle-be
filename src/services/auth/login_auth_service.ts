import { Prisma } from "@prisma/client";
import { LoginUserDTO } from "../../dtos/auth_dto";
import { prisma } from "../../libs/prisma";

export default async function LoginAuthService(email: string) {
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
