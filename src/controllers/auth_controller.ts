import { Request, Response } from "express";
import {
  LoginAuthSchema,
  RegisterAuthSchema,
} from "../utils/schema/auth_schema";
import bcrypt from "bcrypt";
import { RegisterUserDTO } from "../dtos/auth_dto";
import AuthService from "../services/auth_service";
import Joi from "joi";
import jwt from "jsonwebtoken";

class AuthController {
  async LoginAuth(req: Request, res: Response) {
    try {
      // Read Request From Client
      const body = req.body;
      // Pick Field from Body
      const { email, password } = await LoginAuthSchema.validateAsync(body);
      // Inject to DB
      const resultLogin = await AuthService.LoginAuthService(email);

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
          expiresIn: "2 days",
        }
      );

      // Return Response
      res.status(resultLogin.status).json({
        status: 200,
        message: "Success Login",
        token : myToken,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async RegisterAuth(req: Request, res: Response) {
    try {
      // Read Request From Client
      const body = req.body;
      // Validate Request From Client
      const validateRegisterInput = await RegisterAuthSchema.validateAsync(
        body
      );
      // Hash Password
      const HashedPassword = await bcrypt.hash(
        validateRegisterInput.password,
        10
      );
      // Create Register Auth
      const storeToDB: RegisterUserDTO = {
        ...validateRegisterInput,
        password: HashedPassword,
      };
      // Create Register User
      const RegistToDB = await AuthService.createRegisterAuth(storeToDB);
      // Send Response
      res.status(RegistToDB.status).json({
        message: RegistToDB.message,
        data: RegistToDB.data,
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
}

export default new AuthController();
