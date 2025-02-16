import { Request, Response } from "express";
import {
  CreateThreadSchema,
  UpdateThreadSchema,
} from "../utils/schema/thread_schema";
import ThreadService from "../services/thread_service";
import Joi from "joi";

class ThreadController {
  async CreateThreadController(req: Request, res: Response) {
    try {
      // Read All Request
      const userId = (req as any).userVerify.id;
      const bodyThread = req.body;
      const threadValidate = await CreateThreadSchema.validateAsync(bodyThread);

      const resultData = await ThreadService.CreateThreadService(
        userId,
        threadValidate
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
  async GetThreadByIdController(req: Request, res: Response) {
    try {
      // ID Params
      const { id } = req.params;
      // Read By ID
      const thread = await ThreadService.GetThreadById(id);
      // Return Result
      res.status(thread.status).json(thread);
    } catch (error) {
      // Return Error
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async GetThreadAllController(req: Request, res: Response) {
    try {
      // Read All Record
      const threads = await ThreadService.GetAllThreads();
      // Return Result Record
      res.status(threads.status).json(threads);
    } catch (error) {
      // Response Result Error
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async DeleteThreadController(req: Request, res: Response) {
    try {
      // Get ID params
      const { id } = req.params;
      // Delete Inject To service
      const deleteThread = await ThreadService.DeleteThread(id);
      res.status(deleteThread?.status!).json(deleteThread);
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
  async UpdateThreadController(req: Request, res: Response) {
    try {
      // Read ID and Body
      const { id } = req.params;
      const data = req.body;
      // Validate Request From Client
      const validateData = await UpdateThreadSchema.validateAsync(data);

      // Inject Update to DB
      const thread = await ThreadService.UpdateThread(id, validateData);

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
}

export default new ThreadController();
