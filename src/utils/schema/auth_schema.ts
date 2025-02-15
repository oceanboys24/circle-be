import Joi from "joi";
import {
  ForgotPasswordDTO,
  LoginUserDTO,
  RegisterUserDTO,
  ResetPasswordDTO,
} from "../../dtos/auth_dto";

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

const ForgotPasswordSchema = Joi.object<ForgotPasswordDTO>({
  email: Joi.string().email().required(),
});

const ResetPasswordSchema = Joi.object<ResetPasswordDTO>({
  newPassword: Joi.string().min(8).required(),
});

export {
  RegisterAuthSchema,
  LoginAuthSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
};
