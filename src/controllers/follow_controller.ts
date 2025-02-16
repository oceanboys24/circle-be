import { Request, Response } from "express";
import FollowService from "../services/follow_service";

class FollowController {
  async FollowUserController(req: Request, res: Response) {
    try {
      const followerId = (req as any).userVerify.id;
      const { followingId } = req.body;

      const resultFollow = await FollowService.FollowUser(
        followingId,followerId
      );

      res.status(resultFollow.status).json({
        status: resultFollow.status,
        message: resultFollow.message,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async UnFollowUserController(req: Request, res: Response) {
    try {
      const followerId = (req as any).userVerify.id;
      const { followingId } = req.body;

      const resultFollow = await FollowService.UnfollowUser(
        followingId,
        followerId
      );

      res.status(resultFollow.status).json({
        status: resultFollow.status,
        message: resultFollow.message,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
}

export default new FollowController();
