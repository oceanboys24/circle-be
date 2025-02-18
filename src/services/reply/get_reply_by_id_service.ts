import { prisma } from "../../libs/prisma";

export default async function GetReplyByIdService(id: string) {
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
