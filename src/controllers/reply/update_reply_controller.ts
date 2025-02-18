import { Request, Response } from "express";
import { UpdateReplySchema } from "../../utils/schema/reply_schema";
import Joi from "joi";
import UpdateReply from "../../services/reply/update_reply_service";
import UpdateReplyService from "../../services/reply/update_reply_service";

export default async function UpdateReplyController(
  req: Request,
  res: Response
) {
  try {
    // Read ID and Body
    const { id } = req.params;
    const data = req.body;
    // Validate Request From Client
    const validateData = await UpdateReplySchema.validateAsync(data);

    // Inject Update to DB
    const reply = await UpdateReplyService(id, validateData);

    // Return Response to Client
    res.status(reply.status).json(reply);
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
