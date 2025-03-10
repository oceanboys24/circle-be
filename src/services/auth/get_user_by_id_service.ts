import { prisma } from "../../libs/prisma";

export default async function GetAuthUserByIdService(id: string) {
  try {
    const resultUser = await prisma.user.findUnique({
      where: { id },
      omit: {
        password: true,
      },
      include: {
        thread: true,
        followers: {
          include: {
            followers: {
              include: {
                profile: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                profile: true,
              },
            },
          },
        },
        likes: true,
        profile: true,
        Replies: true,
      },
    });
    if (!resultUser) {
      return { status: 404, message: "User Not Found" };
    }
    return {
      status: 200,
      message: "Record Found",
      data: resultUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
