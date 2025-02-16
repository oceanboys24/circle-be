import { Profile, User } from "@prisma/client";

export type ProfileDTO = Pick<User, "fullName"| "userName"  > & Pick<Profile, "avatarUrl" | "bannerUrl" | "bio">



