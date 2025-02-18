import { Request, Response } from "express";
import {
  CreateUserSchema,
} from "../../utils/schema/user_schema";
import Joi from "joi";
import CreateUserService from "../../services/user/create_user_service";

export default async function CreateUserController(
  req: Request,
  res: Response
) {
  try {
    // Read Request
    const body = req.body;
    // Validate Request From Client
    const ValidateUser = await CreateUserSchema.validateAsync(body, {
      abortEarly: false,
    });
    // Call Service Create User
    const userCreate = await CreateUserService(ValidateUser);

    // Return Json if Success
    res.status(userCreate?.status).json(userCreate);
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
