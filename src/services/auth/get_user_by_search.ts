import { prisma } from "../../libs/prisma";

export default async function GetUserBySearchService(search?: string) {
  if (search) {
    return await prisma.user.findMany({
      include: {
        profile: true,
      },
      where: {
        OR: [
          {
            userName: {
              contains: search,
            },
          },
        ],
      },
    });
  }
  return await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
}
