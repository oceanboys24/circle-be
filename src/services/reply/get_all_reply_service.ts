import { prisma } from "../../libs/prisma";

export default async function GetAllReplyService() {
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
