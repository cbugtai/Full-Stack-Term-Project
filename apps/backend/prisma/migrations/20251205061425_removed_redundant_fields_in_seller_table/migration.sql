/*
  Warnings:

  - You are about to drop the column `photo` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Seller` table. All the data in the column will be lost.
  - Made the column `userId` on table `Seller` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_userId_fkey";

-- DropIndex
DROP INDEX "Seller_username_key";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "photo",
DROP COLUMN "username",
ALTER COLUMN "completedSales" SET DEFAULT 0,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
