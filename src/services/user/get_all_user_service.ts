import { prisma } from "../../libs/prisma";

export default async function GetAllUserService() {
  try {
    const resultAllUser = await prisma.user.findMany({
      include: {
        profile: true,
        followers: true,
        following: true,
      },
    });

    if (resultAllUser.length === 0) {
      return { status: 404, message: "User Not Found" };
    }

    return {
      status: 200,
      message: "Users Found",
      data: resultAllUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
