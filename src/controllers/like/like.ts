import { Request, Response } from "express";
import CreateLikes from "../../services/like/create_like";

export default async function CreateLikeController(req: Request, res: Response) {
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

      const resutlLike = await CreateLikes(userId, threadId);

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