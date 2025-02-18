import { Request, Response } from "express";
import { CreateReplySchema } from "../../utils/schema/reply_schema";

import Joi from "joi";
import CreateReplyService from "../../services/reply/create_reply_service";

export default async function CreateReplyController(
  req: Request,
  res: Response
) {
  try {
    // Read All Request
    const userId = (req as any).userVerify.id;
    const bodyThread = req.body;
    const replyValidate = await CreateReplySchema.validateAsync(bodyThread);

    const resultData = await CreateReplyService(userId, replyValidate);

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
