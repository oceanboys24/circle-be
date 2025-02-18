import { Request, Response } from "express";
import GetAllThreads from "../../services/thread/get_all_thread_service";
import GetAllThreadsService from "../../services/thread/get_all_thread_service";

export default async function GetThreadAllController(
  req: Request,
  res: Response
) {
  try {
    // Read All Record
    const threads = await GetAllThreadsService();
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
