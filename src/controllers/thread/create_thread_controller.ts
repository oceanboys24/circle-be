import { Request, Response } from "express";
import { CreateThreadSchema } from "../../utils/schema/thread_schema";
import CreateThreadService from "../../services/thread/create_thread_service";
import Joi from "joi";

export default async function CreateThreadController(
  req: Request,
  res: Response
) {
  try {
    // Read All Request
    const userId = (req as any).userVerify.id;

    const bodyThread = {
      ...req.body,
    };

    const threadValidate = await CreateThreadSchema.validateAsync(bodyThread);

    const resultData = await CreateThreadService(userId, threadValidate);

    res.status(resultData.status).json({
      status: resultData.status,
      message: resultData.message,
      data: resultData.data,
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
