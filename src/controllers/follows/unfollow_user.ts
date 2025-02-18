import { Request, Response } from "express";
import UnfollowUser from "../../services/follow/unfollow_service";

export default async function UnFollowUserController(
  req: Request,
  res: Response
) {
  try {
    const followerId = (req as any).userVerify.id;
    const { followingId } = req.body;

    const resultFollow = await UnfollowUser(
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
