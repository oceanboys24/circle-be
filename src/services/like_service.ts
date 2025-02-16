import { prisma } from "../libs/prisma";

class LikeService {
  async CreateLikes(userId: string, threadId: string) {
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
        status: 200,
        message: "Success Like Thread",
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
  async DeleteLike(userId : string, threadId: string){
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
}

export default new LikeService();
