import Joi from "joi";
import { CreateUserDTO, UpdateUserDTO } from "../../dtos/user_dto";

const CreateUserSchema = Joi.object<CreateUserDTO>({
  userName: Joi.string().alphanum().min(5).required(),
  fullName: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
});

const UpdatedUserSchema = Joi.object<UpdateUserDTO>({
  userName: Joi.string().alphanum().min(5).optional(),
  fullName: Joi.string().min(5).optional(),
  password: Joi.string().min(5).optional(),
});

export { CreateUserSchema, UpdatedUserSchema };
