import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { CreateThreadDTO, UpdateThreadDTO } from "../dtos/thread_dto";
import { prisma } from "../libs/prisma";

class ThreadService {
  async CreateThreadService(userId: string, data: CreateThreadDTO) {
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
  async GetThreadById(id: string) {
    try {
      const resultThread = await prisma.thread.findUnique({
        where: { id },
      });
      if (!resultThread) {
        return { status: 404, message: "Thread Not Found" };
      }

      return {
        status: 200,
        message: "Record Found",
        data: resultThread,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
        details: error,
      };
    }
  }
  async GetAllThreads() {
    try {
      const resultAllThread = await prisma.thread.findMany();

      if (resultAllThread.length === 0) {
        return { status: 404, message: "User Not Found" };
      }

      return {
        status: 200,
        message: "Users Found",
        data: resultAllThread,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }
  async DeleteThread(id: string) {
    try {
      const deletedThread = await prisma.thread.delete({
        where: { id },
      });
      return {
        status: 200,
        message: "Success Delete Thread",
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === "P2025") {
          return {
            status: 404,
            message: "Thread Not Found",
          };
        }
      }
    }
  }

  async UpdateThread(id: string, data: UpdateThreadDTO) {
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
}

export default new ThreadService();
