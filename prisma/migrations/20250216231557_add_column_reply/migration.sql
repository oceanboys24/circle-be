/*
  Warnings:

  - Added the required column `content` to the `Replies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Replies" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "contentImage" TEXT;
