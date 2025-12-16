/*
  Warnings:

  - Made the column `playId` on table `Record` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Record" ALTER COLUMN "playId" SET NOT NULL;
