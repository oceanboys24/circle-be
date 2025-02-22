import { Request, Response } from "express";
import { LoginAuthSchema } from "../../utils/schema/auth_schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import LoginAuthService from "../../services/auth/login_auth_service";
import Joi from "joi";

export default async function LoginAuthController(req: Request, res: Response) {
  try {
    // Read Request From Client
    const body = req.body;
    // Pick Field from Body
    const { email, password } = await LoginAuthSchema.validateAsync(body);
    // Inject to DB
    const resultLogin = await LoginAuthService(email);

    // Compare Password
    const isPasswordMatch = await bcrypt.compare(
      password,
      resultLogin.data?.password!
    );
    // Check Password
    if (!isPasswordMatch) {
      res.status(404).json({
        message: "Email/password is wrong!",
      });
      return;
    }
    // Create JWT
    const jwtSecret = process.env.JWT_SECRET || "";

    const myToken = jwt.sign(
      {
        id: resultLogin.data?.id,
      },
      jwtSecret,
      {
        expiresIn: "1 days",
      }
    );

    // Return Response
    res.status(resultLogin.status).json({
      status: 200,
      message: "Success Login",
      token: myToken,
      data: resultLogin,
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
