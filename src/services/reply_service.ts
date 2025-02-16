import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateReplyDTO, UpdateReplyDTO } from "../dtos/reply_dto";
import { prisma } from "../libs/prisma";

class ReplyService {
  async CreateReplyService(userId: string, data: CreateReplyDTO) {
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
        status: 200,
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
  async GetReplyById(id: string) {
    try {
      const resultReply = await prisma.reply.findUnique({
        where: { id },
      });
      if (!resultReply) {
        return { status: 404, message: "Reply Not Found" };
      }

      return {
        status: 200,
        message: "Record Found",
        data: resultReply,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        details: error,
      };
    }
  }
  async GetAllReply() {
    try {
      const resultAllReply = await prisma.reply.findMany();

      if (resultAllReply.length === 0) {
        return { status: 404, message: "Reply Not Found" };
      }

      return {
        status: 200,
        message: "Replies Found",
        data: resultAllReply,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
  async DeleteReply(id: string) {
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

  async UpdateReply(id: string, data: UpdateReplyDTO) {
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
}

export default new ReplyService();
