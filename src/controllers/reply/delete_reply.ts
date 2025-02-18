import { Request, Response } from "express";
import DeleteReply from "../../services/reply/delete_reply_service";

export default async function DeleteReplyController(
  req: Request,
  res: Response
) {
  try {
    // Get ID params
    const { id } = req.params;
    // Delete Inject To service
    const deleteReply = await DeleteReply(id);
    res.status(deleteReply?.status!).json(deleteReply);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
