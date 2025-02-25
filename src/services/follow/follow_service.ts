import { prisma } from "../../libs/prisma";

export default async function FollowUserService(
  followersId: string,
  followingId: string
) {
  try {
    if (followersId === followingId) {
      return {
        status: 400,
        message: "You Cannot Follow Yourself",
      };
    }

    const existingFollow = await prisma.follow.findFirst({
      where: { followersId, followingId },
    });

    if (existingFollow) {
      return {
        status: 400,
        message: "Already Following",
      };
    }

    await prisma.follow.create({
      data: { followersId, followingId },
    });

    return { status: 200, message: "Successfully Followed User" };
  } catch (error: any) {
    console.error(error);
    return { status: 500, message: "Internal Server Error" };
  }
}

export async function GetFollowById(userId: string, otherUser: string) {
  return await prisma.follow.findFirst({
    where: {
      followersId: otherUser,
      followingId: userId,
    },
  });
}

