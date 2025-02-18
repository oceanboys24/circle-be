import { Request, Response } from "express";
import DeleteThread from "../../services/thread/delete_thread_service";
import DeleteThreadService from "../../services/thread/delete_thread_service";

export default async function DeleteThreadController(
  req: Request,
  res: Response
) {
  try {
    // Get ID params
    const { id } = req.params;
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
