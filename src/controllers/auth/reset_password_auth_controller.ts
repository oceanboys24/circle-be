import { ResetPasswordSchema } from "../../utils/schema/auth_schema";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import GetUserByEmail from "../../services/auth/get_user_by_email_service";
import ResetPasswordAuthService from "../../services/auth/reset_password_service";
import Joi from "joi";

export default async function ResetPasswordAuthController(
  req: Request,
  res: Response
) {
  try {
    const userPayload = (req as any).userVerify;
    const body = req.body;
    const { newPassword } = await ResetPasswordSchema.validateAsync(body);

    const user = await GetUserByEmail(userPayload.email);
    if (!user) {
      res.status(404).json({
        message: "User not found!",
      });
      return;
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUserPassword = await ResetPasswordAuthService(
      user.data?.email!,
      hashedNewPassword
    );

    res.status(200).json({
      status: 200,
      message: "Success Change Password",
    });
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      res.status(422).json({
        status: 422,
        message: "Validation Error",
        details: error.details.map((detail) => detail.message),
      });
      return;
    }
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}
