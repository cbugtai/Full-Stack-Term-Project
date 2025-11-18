/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Seller_userId_key" ON "Seller"("userId");

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
