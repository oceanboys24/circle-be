import Joi from "joi";
import { Request, Response } from "express";
import GetAllReply from "../../services/reply/get_all_reply_service";
import GetAllReplyService from "../../services/reply/get_all_reply_service";

export default async function GetReplyAllController(
  req: Request,
  res: Response
) {
  try {
    // Read All Record
    const reply = await GetAllReplyService();
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
