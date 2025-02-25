import { Request, Response } from "express";
import FollowUserService from "../../services/follow/follow_service";
import { prisma } from "../../libs/prisma";

export default async function FollowUserController(
  req: Request,
  res: Response
) {
  try {
    const followerId = (req as any).userVerify.id;
    const { followingId } = req.body;

    const resultFollow = await FollowUserService(followingId, followerId);

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

export async function GetFollowing(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const followers = await prisma.follow.findMany({
      where: { followingId: userId },
      select: {
        followersId: true,
        followers: {
          select: {
            fullName: true,
            profile: true,
            userName: true,
          },
        },
      },
    });

    res.status(200).json({
      status: 200,
      message: "Successfully retrieved following",
      data: followers.map((f) => ({
        id: f.followersId,
        fullName: f.followers?.fullName,
        profile: f.followers?.profile,
        userName: f.followers?.userName,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

export async function GetFollowers(req: Request, res: Response) {
  try {
    const { userId } = req.params;

    const following = await prisma.follow.findMany({
      where: { followersId: userId },
      select: {
        followingId: true,
        following: {
          select: {
            fullName: true,
            profile: true,
            userName: true,
          },
        },
      },
    });

    res.status(200).json({
      status: 200,
      message: "Successfully retrieved followers",
      data: following.map((f) => ({
        id: f.following,
        fullName: f.following?.fullName,
        profile: f.following?.profile,
        userName: f.following?.userName,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
