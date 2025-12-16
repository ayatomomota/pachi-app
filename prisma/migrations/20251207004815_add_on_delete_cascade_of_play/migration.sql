/*
  Warnings:

  - Made the column `createdDate` on table `Play` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Play" DROP CONSTRAINT "Play_userId_fkey";

-- AlterTable
ALTER TABLE "Play" ALTER COLUMN "createdDate" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
