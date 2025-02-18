import { Request, Response } from "express";

import GetUserByIdService from "../../services/user/get_user_by_id_service";

export default async function GetUserByIdController(req: Request, res: Response) {
  try {
    // ID Params
    const { id } = req.params;
    // Read By ID
    const user = await GetUserByIdService(id);
    // Return Result
    res.status(user.status).json(user);
  } catch (error) {
    // Return Error
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
