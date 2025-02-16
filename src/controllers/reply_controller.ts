import { Request, Response } from "express";
import {
  CreateReplySchema,
  UpdateReplySchema,
} from "../utils/schema/reply_schema";
import ReplyService from "../services/reply_service";
import Joi from "joi";

class ReplyController {
  async CreateReplyController(req: Request, res: Response) {
    try {
      // Read All Request
      const userId = (req as any).userVerify.id;
      const bodyThread = req.body;
      const replyValidate = await CreateReplySchema.validateAsync(bodyThread);

      const resultData = await ReplyService.CreateReplyService(
        userId,
        replyValidate
      );

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
  async GetReplyByIdController(req: Request, res: Response) {
    try {
      // ID Params
      const { id } = req.params;
      // Read By ID
      const reply = await ReplyService.GetReplyById(id);
      // Return Result
      res.status(reply.status).json(reply);
    } catch (error) {
      // Return Error
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async GetReplyAllController(req: Request, res: Response) {
    try {
      // Read All Record
      const reply = await ReplyService.GetAllReply();
      // Return Result Record
      res.status(reply.status).json(reply);
    } catch (error) {
      // Response Result Error
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async DeleteReplyController(req: Request, res: Response) {
    try {
      // Get ID params
      const { id } = req.params;
      // Delete Inject To service
      const deleteReply = await ReplyService.DeleteReply(id);
      res.status(deleteReply?.status!).json(deleteReply);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async UpdateReplyController(req: Request, res: Response) {
    try {
      // Read ID and Body
      const { id } = req.params;
      const data = req.body;
      // Validate Request From Client
      const validateData = await UpdateReplySchema.validateAsync(data);

      // Inject Update to DB
      const reply = await ReplyService.UpdateReply(id, validateData);

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
}

export default new ReplyController();
