import { prisma } from "../../libs/prisma";

export default async function GetThreadById(id: string) {
  try {
    const resultThread = await prisma.thread.findUnique({
      where: { id },
    });
    if (!resultThread) {
      return { status: 404, message: "Thread Not Found" };
    }

    return {
      status: 200,
      message: "Record Found",
      data: resultThread,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
      details: error,
    };
  }
}
