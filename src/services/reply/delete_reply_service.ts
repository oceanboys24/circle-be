import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../libs/prisma";

export default async function DeleteReply(id: string) {
  try {
    const deletedReply = await prisma.reply.delete({
      where: { id },
    });
    return {
      status: 200,
      message: "Success Delete Reply",
    };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return {
          status: 404,
          message: "Reply Not Found",
        };
      }
    }
  }
}
