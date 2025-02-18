import { UpdateReplyDTO } from "../../dtos/reply_dto";
import { prisma } from "../../libs/prisma";

export default async function UpdateReply(id: string, data: UpdateReplyDTO) {
    try {
      const replyUpdate = await prisma.reply.findUnique({
        where: { id },
      });
      if (!replyUpdate) {
        return {
          status: 404,
          message: "Record Not Found",
        };
      }

      // Check Data is Update or Not
      const isDataSame = Object.keys(data).every(
        (key) => (data as any)[key] === (replyUpdate as any)[key]
      );

      if (isDataSame) {
        return {
          status: 200,
          message: "Not updated yet",
        };
      }

      const updatedReply = await prisma.reply.update({
        where: { id },
        data: {
          content: data.content,
          contentImage: data.contentImage,
          updatedAt: new Date(),
        },
      });

      return {
        status: 200,
        message: "Success Update Reply",
        data: updatedReply,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }