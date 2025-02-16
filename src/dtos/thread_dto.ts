import { Thread } from "@prisma/client";


export type CreateThreadDTO = Pick<Thread, "content" | "imageContent" | "userId">
export type UpdateThreadDTO = Pick<Thread, "content" | "imageContent" >