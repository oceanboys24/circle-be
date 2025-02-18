import { UpdateUserDTO } from "../../dtos/user_dto";
import { prisma } from "../../libs/prisma";

export default async function UpdateUserByIdService(
  id: string,
  data: UpdateUserDTO
) {
  try {
    const userUpdate = await prisma.user.findUnique({
      where: { id },
    });
    if (!userUpdate) {
      return {
        status: 404,
        message: "Record Not Found",
      };
    }

    // Check Data is Update or Not
    const isDataSame = Object.keys(data).every(
      (key) => (data as any)[key] === (userUpdate as any)[key]
    );

    if (isDataSame) {
      return {
        status: 200,
        message: "Not updated yet",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });

    return {
      status: 200,
      message: "Success Update User",
      data: updatedUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Internal Server Error",
    };
  }
}
