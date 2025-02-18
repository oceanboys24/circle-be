import { Request, Response } from "express";
import FollowUserService from "../../services/follow/follow_service";

export default async function FollowUserController(
  req: Request,
  res: Response
) {
  try {
    const followerId = (req as any).userVerify.id;
    const { followingId } = req.body;

    const resultFollow = await FollowUserService(
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
