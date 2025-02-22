import { CreateReplyDTO } from "../../dtos/reply_dto";
import { prisma } from "../../libs/prisma";

 
 
export default async function CreateReplyService(userId: string, data: CreateReplyDTO) {
    try {
      const resultData = await prisma.reply.create({
        data: {
          content: data.content,
          contentImage: data.contentImage,
          userId: userId,
          threadId: data.threadId,
        },
      });
      return {
        status: 201,
        message: "Success Create Reply",
        data: resultData,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        details: error,
      };
    }
  }