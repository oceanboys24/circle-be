import { prisma } from "../../libs/prisma";

export default async function UnfollowUser(
  followersId: string,
  followingId: string
) {
  try {
    const existingFollow = await prisma.follow.findUnique({
      where: { followingId_followersId: { followingId, followersId } },
    });

    if (!existingFollow) {
      return {
        status: 400,
        message: "You are not following this user",
      };
    }
    const resultFollow = await prisma.follow.delete({
      where: { followingId_followersId: { followingId, followersId } },
    });

    return { status: 200, message: "Successfully Unfollow User" };
  } catch (error) {
    return { status: 500, message: "Internal Server Error" };
  }
}
