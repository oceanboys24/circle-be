import { User } from "@prisma/client";

export type RegisterUserDTO = Pick<
  User,
  "userName" | "email" | "fullName" | "password"
>;
export type LoginUserDTO = Pick<User, "email" | "password">;
export type ForgotPasswordDTO = Pick<User, "email">;
export type ResetPasswordDTO = {
  newPassword: string;
};
