import Joi from "joi";
import { CreateReplyDTO, UpdateReplyDTO } from "../../dtos/reply_dto";

export const CreateReplySchema = Joi.object<CreateReplyDTO>({
  content: Joi.string().min(5).required(),
  contentImage: Joi.string().optional(),
  threadId: Joi.required(),
});

export const UpdateReplySchema = Joi.object<UpdateReplyDTO>({
  content: Joi.string().min(5).optional(),
  contentImage: Joi.string().optional(),
});
