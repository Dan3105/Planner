/*
  Warnings:

  - You are about to drop the `Block` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_pageId_fkey";

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "content" JSONB,
ADD COLUMN     "parentId" TEXT;

-- DropTable
DROP TABLE "Block";

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;
