import { Reply } from "@prisma/client";

export type CreateReplyDTO = Pick<
  Reply,
  "content" | "contentImage" | "threadId"
>;
export type UpdateReplyDTO = Pick<Reply, "content" | "contentImage">;
