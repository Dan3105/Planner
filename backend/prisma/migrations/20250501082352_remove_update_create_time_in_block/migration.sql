/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Block` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Block" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
