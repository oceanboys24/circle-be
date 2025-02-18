import { prisma } from "../../libs/prisma";

export default async function GetAllThreadsService() {
  try {
    const resultAllThread = await prisma.thread.findMany();

    if (resultAllThread.length === 0) {
      return { status: 404, message: "Thread Not Found" };
    }

    return {
      status: 200,
      message: "Threads Found",
      data: resultAllThread,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
