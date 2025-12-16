/*
  Warnings:

  - You are about to drop the column `startCount` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Play" ADD COLUMN     "startCount" INTEGER;

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "startCount";
