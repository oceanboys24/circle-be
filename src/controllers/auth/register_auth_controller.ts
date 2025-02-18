import { RegisterAuthSchema } from "../../utils/schema/auth_schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterUserDTO } from "../../dtos/auth_dto";
import { Request, Response } from "express";
import Joi from "joi";
import CreateRegisterAuth from "../../services/auth/register_auth_service";

export default async function RegisterAuthController(req: Request, res: Response) {
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
      const RegistToDB = await CreateRegisterAuth(storeToDB);
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