import { Request, Response } from "express";
import DeleteLike from "../../services/like/delete_like_service";
import DeleteLikeService from "../../services/like/delete_like_service";

export default async function UnlikeController(req: Request, res: Response) {
    try {
      const userId = (req as any).userVerify.id;
      const { threadId } = req.body;

      if (!threadId) {
        res.status(400).json({
          status: 400,
          message: "Thread id Required",
        });
        return;
      }

      const resutlLike = await DeleteLikeService(userId, threadId);

      res.status(resutlLike.status).json({
        status: resutlLike.status,
        message: resutlLike.message,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: "Internal Server Error",
      });
    }
  }