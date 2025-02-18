import { Request, Response } from "express";
import {
  CreateUserSchema,
  UpdatedUserSchema,
} from "../../utils/schema/user_schema";
import Joi from "joi";
import UpdateUserByIdService from "../../services/user/update_user_service";

export default async function UpdateUserByIdController(
  req: Request,
  res: Response
) {
  try {
    // Read ID and Body
    const { id } = req.params;
    const data = req.body;
    // Validate Request From Client
    const validateData = await UpdatedUserSchema.validateAsync(data);

    // Inject Update to DB
    const user = await UpdateUserByIdService(id, validateData);

    // Return Response to Client
    res.status(user.status).json(user);
  } catch (error) {
    // Error Joi
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
