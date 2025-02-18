import { CreateThreadDTO } from "../../dtos/thread_dto";
import { prisma } from "../../libs/prisma";


export default async function CreateThreadService(userId: string, data: CreateThreadDTO) {
    try {
      const resultData = await prisma.thread.create({
        data: {
          userId: userId,
          content: data.content,
          imageContent: data.imageContent,
        },
      });
      return {
        status: 200,
        message: "Success Create Thread",
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