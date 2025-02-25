import { Request, Response } from "express";
import GetAllThreads, {
  GetAllThreadsRealService,
} from "../../services/thread/get_all_thread_service";
import GetAllThreadsService from "../../services/thread/get_all_thread_service";
import { GetLikeById } from "../../services/like/create_like_service";

export default async function GetThreadAllController(
  req: Request,
  res: Response
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;

    const pagination = {
      startIndex,
      limit,
    };
    const userId = (req as any).userVerify.id;
    // Read All Record
    const threads = await GetAllThreadsService(pagination);

    const newThreads = await Promise.all(
      threads.data?.map(async (thread) => {
        const like = await GetLikeById(userId, thread.id);
        const isLiked = like ? true : false;
        const likesCount = thread.likes.length;

        return {
          ...thread,
          likesCount,
          isLiked,
        };
      }) || []
    );
    // console.log(newThreads)

    res.status(threads.status).json({
      status: threads.status,
      data: newThreads,
    });
  } catch (error) {
    // Response Result Error
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
}

export async function GetThreadAllRealController(req: Request, res: Response) {
  try {
    // Read All Record
    const threads = await GetAllThreadsRealService();

    res.status(threads.status).json(threads);
  } catch (error) {
    // Response Result Error
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
}
