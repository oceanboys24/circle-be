import { Request, Response } from "express";
import GetAllUserService from "../../services/user/get_all_user_service";
import { GetFollowById } from "../../services/follow/follow_service";

export default async function GetAllUserController(
  req: Request,
  res: Response
) {
  try {
    // Read All Record
    const userId = (req as any).userVerify.id;
    const user = await GetAllUserService();

    const newUsers = await Promise.all(
      user.data?.map(async (user) => {
        const follow = await GetFollowById(userId, user.id);
        const isFollow = follow ? true : false;
        return {
          ...user,
          isFollow,
        };
      }) || []
    );
    // Return Result Record
    res.status(user.status).json({
      status: 200,
      data: newUsers,
    });
  } catch (error) {
    // Response Result Error
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
