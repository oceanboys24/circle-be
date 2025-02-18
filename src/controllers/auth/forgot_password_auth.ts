import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ForgotPasswordSchema } from "../../utils/schema/auth_schema";
import { transporter } from "../../libs/nodemailer";
import GetUserByEmail from "../../services/auth/get_user_by_email";

export default async function ForgotPasswordAuth(req: Request, res: Response) {
  try {
    // Read Request From Client and Validate
    const body = req.body;
    const { email } = await ForgotPasswordSchema.validateAsync(body);
    // Check Email Available
    const GetExistingUser = await GetUserByEmail(email);

    if (GetExistingUser.status === 404) {
      res.status(GetExistingUser.status).json({
        status: GetExistingUser.status,
        message: GetExistingUser.message,
      });
      return;
    }
    // Create JWT
    const jwtSecret = process.env.JWT_SECRET || "";
    // Generate Token to Email
    const token = jwt.sign({ email }, jwtSecret, {
      expiresIn: "20m",
    });
    // Link Reset Password
    const resetPasswordLink = `localhost/reset-password?token=${token}`;
    // Body Reset Password
    const mailOptions = {
      from: "admin@oceanboys.cloud",
      to: email,
      subject: "Circle | Forgot Password",
      html: ` This is link for reset password: ${resetPasswordLink}`,
    };

    // Send Link
    await transporter.sendMail(mailOptions);
    // Return Result
    res.status(200).json({
      status: 200,
      message: "Link Reset Password Send",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
}
