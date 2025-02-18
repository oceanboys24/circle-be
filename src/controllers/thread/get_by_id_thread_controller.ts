import { Request, Response } from "express";
import GetThreadById from "../../services/thread/get_by_id_thread_service";
import GetThreadByIdService from "../../services/thread/get_by_id_thread_service";

export default async function GetThreadByIdController(
  req: Request,
  res: Response
) {
  try {
    // ID Params
    const { id } = req.params;
    // Read By ID
    const thread = await GetThreadByIdService(id);
    // Return Result
    res.status(thread.status).json(thread);
  } catch (error) {
    // Return Error
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
