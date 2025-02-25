import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ForgotPasswordSchema } from "../../utils/schema/auth_schema";
import { transporter } from "../../libs/nodemailer";
import GetUserByEmail from "../../services/auth/get_user_by_email_service";
import Joi from "joi";

export default async function ForgotPasswordAuthController(
  req: Request,
  res: Response
) {
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
    const resetPasswordLink = `http://localhost:5173/reset-password?token=${token}`;
    // Body Reset Password
    const mailOptions = {
      from: "admin@oceanboys.cloud",
      to: email,
      subject: "Circle | Forgot Password",
      html: `This is the link to reset your password: 
         <a href="${resetPasswordLink}" target="_blank">${resetPasswordLink}</a>. 
         This token expires in 20 minutes.`,
    };

    // Send Link
    await transporter.sendMail(mailOptions);
    // Return Result
    res.status(200).json({
      status: 200,
      message: "Link Reset Password Send",
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
      error: error,
    });
  }
}
