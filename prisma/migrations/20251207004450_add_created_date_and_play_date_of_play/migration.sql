/*
  Warnings:

  - You are about to drop the column `date` on the `Play` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Play" DROP COLUMN "date",
ADD COLUMN     "createdDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "playDate" TIMESTAMP(3);
