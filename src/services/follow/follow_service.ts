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
    const existingFollow = await prisma.follow.findUnique({
      where: { followingId_followersId: { followersId, followingId } },
    });

    if (existingFollow) {
      return {
        status: 400,
        message: "Already Follow",
      };
    }
    const resultFollow = await prisma.follow.create({
      data: { followersId, followingId },
    });
    return { status: 200, message: "Successfully Follow User" };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
}
