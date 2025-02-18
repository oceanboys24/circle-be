import { Request, Response } from "express";

import Joi from "joi";
import GetReplyById from "../../services/reply/get_reply_by_id_service";
import GetReplyByIdService from "../../services/reply/get_reply_by_id_service";

 export default async function GetReplyByIdController(req: Request, res: Response) {
    try {
      // ID Params
      const { id } = req.params;
      // Read By ID
      const reply = await GetReplyByIdService(id);
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