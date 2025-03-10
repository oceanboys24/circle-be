import { prisma } from "../../libs/prisma";

export default async function CreateLikesService(
  userId: string,
  threadId: string
) {
  try {
    const existingLike = await prisma.like.findUnique({
      where: { userId_threadId: { userId, threadId } },
    });

    if (existingLike) {
      return {
        status: 400,
        message: "Already Liked",
      };
    }
    const likeResult = await prisma.like.create({
      data: { userId, threadId },
    });

    return {
      status: 201,
      message: "Success Like Thread",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
export async function GetLikeById(userId: string, threadId: string) {
  return await prisma.like.findFirst({
    where: {
      userId,
      threadId,
    },
  });
}
