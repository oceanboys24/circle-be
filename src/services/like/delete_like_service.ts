import { prisma } from "../../libs/prisma";
export default async function DeleteLikeService(userId: string, threadId: string) {
  try {
    const likeResult = await prisma.like.deleteMany({
      where: { userId, threadId },
    });

    return {
      status: 200,
      message: "Success Unlike Thread",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
