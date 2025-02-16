import Joi from "joi";
import { CreateThreadDTO, UpdateThreadDTO } from "../../dtos/thread_dto";

export const CreateThreadSchema = Joi.object<CreateThreadDTO>({
  content: Joi.string().min(5).required(),
  imageContent: Joi.string().optional(),
});


export const UpdateThreadSchema = Joi.object<UpdateThreadDTO>({
  content: Joi.string().min(5).optional(),
  imageContent: Joi.string().optional(),
});
