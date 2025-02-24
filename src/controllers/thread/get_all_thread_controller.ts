import { Request, Response } from "express";
import GetAllThreads from "../../services/thread/get_all_thread_service";
import GetAllThreadsService from "../../services/thread/get_all_thread_service";

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
    // Read All Record
    const threads = await GetAllThreadsService(pagination);
    // Return Result Record
    res.status(threads.status).json(threads);
  } catch (error) {
    // Response Result Error
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
