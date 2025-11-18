/*
  Warnings:

  - You are about to drop the column `userId` on the `Seller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `completedSales` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `rating` on the `Seller` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_userId_fkey";

-- DropIndex
DROP INDEX "Seller_userId_key";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "userId",
ADD COLUMN     "completedSales" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserSellerPreference" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sellerId" INTEGER NOT NULL,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserSellerPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSellerPreference_userId_sellerId_key" ON "UserSellerPreference"("userId", "sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "Seller_username_key" ON "Seller"("username");

-- AddForeignKey
ALTER TABLE "UserSellerPreference" ADD CONSTRAINT "UserSellerPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSellerPreference" ADD CONSTRAINT "UserSellerPreference_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
