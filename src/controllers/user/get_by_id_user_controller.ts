import { Request, Response } from "express";

import GetUserByIdService from "../../services/user/get_user_by_id_service";
import GetAuthUserByIdService from "../../services/auth/get_user_by_id_service";
import { GetFollowById } from "../../services/follow/follow_service";

export default async function GetUserByIdController(
  req: Request,
  res: Response
) {
  try {
    // ID Params
    const { id } = req.params;
    const userId = (req as any).userVerify.id;

    // Read By ID
    const user = await GetAuthUserByIdService(id);
    const follow = await GetFollowById(userId, id);
    const isFollow = follow ? true : false;
    const newUserGet = {
      ...user.data,
      isFollow,
    };
    // Return Result
    res.status(user.status).json({
      status: 200,
      message: "Success",
      data: newUserGet,
    });
  } catch (error) {
    // Return Error
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
