-- CreateTable
CREATE TABLE "Follows" (
    "id" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "followersId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Follows_followingId_followersId_key" ON "Follows"("followingId", "followersId");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_followersId_fkey" FOREIGN KEY ("followersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
