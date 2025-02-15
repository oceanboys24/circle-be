import Joi from "joi";
import { LoginUserDTO, RegisterUserDTO } from "../../dtos/auth_dto";

const RegisterAuthSchema = Joi.object<RegisterUserDTO>({
  userName: Joi.string().alphanum().min(5).required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().min(5).required(),
  password: Joi.string().min(5).required(),
});

const LoginAuthSchema = Joi.object<LoginUserDTO>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});


export { RegisterAuthSchema, LoginAuthSchema };
