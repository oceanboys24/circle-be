import { Request, Response } from "express";
import DeleteThread from "../../services/thread/delete_thread_service";
import DeleteThreadService from "../../services/thread/delete_thread_service";
import GetThreadByIdService from "../../services/thread/get_by_id_thread_service";

export default async function DeleteThreadController(
  req: Request,
  res: Response
) {
  try {
    const userId = (req as any).userVerify.id;
    // Get ID params
    const { id } = req.params;
    const getOwnerThread = await GetThreadByIdService(id);

    if (userId !== getOwnerThread.data?.userId) {
      res.status(403).json({
        status: 403,
        message: "Not Ownership Threads",
      });
      return;
    }
    // Delete Inject To service
    const deleteThread = await DeleteThreadService(id);
    res.status(deleteThread?.status!).json(deleteThread);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
