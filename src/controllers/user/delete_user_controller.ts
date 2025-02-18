import { Request, Response } from "express";
import DeleteUserByIdService from "../../services/user/delete_user_service";

export default async function DeleteUserByIdController(
  req: Request,
  res: Response
) {
  try {
    // Get ID params
    const { id } = req.params;
    // Delete Inject To service
    const deleteUser = await DeleteUserByIdService(id);
    res.status(deleteUser?.status!).json(deleteUser);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
