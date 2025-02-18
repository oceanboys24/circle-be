import { prisma } from "../../libs/prisma";

export default async function GetUserByIdService(id: string) {
  try {
    const resultUser = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
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
