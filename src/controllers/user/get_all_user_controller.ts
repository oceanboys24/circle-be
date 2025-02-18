import { Request, Response } from "express";
import GetAllUserService from "../../services/user/get_all_user_service";

export default async function GetAllUserController(
  req: Request,
  res: Response
) {
  try {
    // Read All Record
    const user = await GetAllUserService();
    // Return Result Record
    res.status(user.status).json(user);
  } catch (error) {
    // Response Result Error
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
