import { prisma } from "../../libs/prisma";

export default async function ResetPasswordAuthService(
  email: string,
  hashedNewPassword: string
) {
  return await prisma.user.update({
    where: { email },
    data: {
      password: hashedNewPassword,
    },
  });
}
