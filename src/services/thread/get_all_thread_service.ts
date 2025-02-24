import { prisma } from "../../libs/prisma";

export default async function GetAllThreadsService(pagination?: {
  startIndex: number;
  limit: number;
}) {
  try {
    const resultAllThread = await prisma.thread.findMany({
      include: {
        user: {
          omit: {
            password: true,
          },
          include: {
            profile: true,
          },
        },
        likes: true,
        replies: true,
      },
      take: pagination?.limit,
      skip: pagination?.startIndex,
      orderBy: {
        createdAt: "desc",
      },
    });

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
