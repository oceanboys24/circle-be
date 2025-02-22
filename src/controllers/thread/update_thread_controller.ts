import { Request, Response } from "express";
import { UpdateThreadSchema } from "../../utils/schema/thread_schema";
import UpdateThread from "../../services/thread/update_thread_service";
import Joi from "joi";
import UpdateThreadService from "../../services/thread/update_thread_service";
import GetUserByIdService from "../../services/user/get_user_by_id_service";
import GetThreadByIdController from "./get_by_id_thread_controller";
import GetThreadByIdService from "../../services/thread/get_by_id_thread_service";

export default async function UpdateThreadController(
  req: Request,
  res: Response
) {
  try {
    const userId = (req as any).userVerify.id;
    // Read ID and Body
    const { id } = req.params;
    const getOwnerThread = await GetThreadByIdService(id);
   
    if (userId !== getOwnerThread.data?.userId) {
      res.status(403).json({
        status: 403,
        message: "Not Ownership Threads",
      });
      return
    }
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
