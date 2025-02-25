import { Request, Response } from "express";
import GetThreadById from "../../services/thread/get_by_id_thread_service";
import GetThreadByIdService from "../../services/thread/get_by_id_thread_service";
import { GetLikeById } from "../../services/like/create_like_service";

export default async function GetThreadByIdController(
  req: Request,
  res: Response
) {
  try {
    // ID Params
    const { id } = req.params;
    const userId = (req as any).userVerify.id;

    // Read By ID
    const thread = await GetThreadByIdService(id);

    const like = await GetLikeById(userId, thread.data?.id ?? " ");
    const isLiked = like ? true : false;
    const likesCount = thread.data?.likes.length;

    const newThread = {
      ...thread.data,
      isLiked,
      likesCount,
    };
    // Return Result
    res.status(thread.status).json(newThread);
  } catch (error) {
    // Return Error
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
