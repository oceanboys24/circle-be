import { Prisma } from "@prisma/client";
import { prisma } from "../../libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default async function DeleteUserByIdService(id: string) {
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
