import { UpdateThreadDTO } from "../../dtos/thread_dto";
import { prisma } from "../../libs/prisma";

export default async function UpdateThread(id: string, data: UpdateThreadDTO) {
  try {
    const threadUpdate = await prisma.thread.findUnique({
      where: { id },
    });
    if (!threadUpdate) {
      return {
        status: 404,
        message: "Record Not Found",
      };
    }

    // Check Data is Update or Not
    const isDataSame = Object.keys(data).every(
      (key) => (data as any)[key] === (threadUpdate as any)[key]
    );

    if (isDataSame) {
      return {
        status: 200,
        message: "Not updated yet",
      };
    }

    const updatedThread = await prisma.thread.update({
      where: { id },
      data: {
        content: data.content,
        imageContent: data.imageContent,
        updatedAt: new Date(),
      },
    });

    return {
      status: 200,
      message: "Success Update Thread",
      data: updatedThread,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
