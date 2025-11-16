/*
  Warnings:

  - A unique constraint covering the columns `[userId,listingId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reviews_userId_listingId_key" ON "Reviews"("userId", "listingId");
