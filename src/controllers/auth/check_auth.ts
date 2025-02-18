import GetAuthUserById from "../../services/auth/get_user_by_id";
import { Request, Response } from "express";


export default async function CheckAuth(req: Request, res: Response) {
  try {
    const userPayload = (req as any).userVerify;
    const userVerify = await GetAuthUserById(userPayload.id);
    

    res.status(userVerify.status).json({
      status: userVerify.status,
      message: userVerify.message,
      data: userVerify.data,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
