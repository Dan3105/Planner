/*
  Warnings:

  - A unique constraint covering the columns `[pageId,order]` on the table `Block` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Block_pageId_order_key" ON "Block"("pageId", "order");
