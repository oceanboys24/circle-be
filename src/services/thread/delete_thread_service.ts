import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../../libs/prisma";

export default async function DeleteThread(id: string) {
  try {
    const deletedThread = await prisma.thread.delete({
      where: { id },
    });
    return {
      status: 200,
      message: "Success Delete Thread",
    };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return {
          status: 404,
          message: "Thread Not Found",
        };
      }
    }
  }
}
