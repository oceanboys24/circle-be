import { Profile, User } from "@prisma/client";

export type ProfileDTO = Pick<User,  "userName" | "fullName"  > & Pick<Profile, "avatarUrl" | "bannerUrl" | "bio">



