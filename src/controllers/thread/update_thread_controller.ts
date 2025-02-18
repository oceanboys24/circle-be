import { Request, Response } from "express";
import { UpdateThreadSchema } from "../../utils/schema/thread_schema";
import UpdateThread from "../../services/thread/update_thread_service";
import Joi from "joi";
import UpdateThreadService from "../../services/thread/update_thread_service";

export default async function UpdateThreadController(
  req: Request,
  res: Response
) {
  try {
    // Read ID and Body
    const { id } = req.params;
    const fileUpload = req.file;
    let image = fileUpload
      ? (req.file as Express.MulterS3.File).location
      : undefined;

    const bodyThread = { ...req.body, imageContent: image };
    // Validate Request From Client
    const validateData = await UpdateThreadSchema.validateAsync(bodyThread);

    // Inject Update to DB
    const thread = await UpdateThreadService(id, validateData);

    // Return Response to Client
    res.status(thread.status).json(thread);
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
