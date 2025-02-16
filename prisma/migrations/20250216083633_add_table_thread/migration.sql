-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "avatarUrl" DROP DEFAULT,
ALTER COLUMN "bannerUrl" DROP DEFAULT,
ALTER COLUMN "bio" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Threads" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageContent" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Threads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Threads" ADD CONSTRAINT "Threads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
