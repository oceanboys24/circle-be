import { prisma } from "../../libs/prisma";
import { ProfileDTO } from "../../dtos/profile_dto";

export default async function AddProfileService(userId: string, data: ProfileDTO) {
    try {
      const dataProfile = await prisma.profile.upsert({
        where: { userId: userId },
        update: {
          bio: data.bio,
          avatarUrl: data.avatarUrl,
          bannerUrl: data.bannerUrl,
          user: {
            update: {
              fullName: data.userName,
              userName: data.fullName,
            },
          },
        },
        create: {
          userId: userId,
          bio: data.bio,
          avatarUrl: data.avatarUrl,
          bannerUrl: data.bannerUrl,
        },
        include: {
          user: {
            select: { fullName: true, userName: true },
          },
        },
      });
      return {
        status: 201,
        message: "Success Create",
        data: dataProfile,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Internal Server Error",
      };
    }
  }