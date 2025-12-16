/*
  Warnings:

  - You are about to drop the column `note` on the `Record` table. All the data in the column will be lost.
  - Added the required column `machineId` to the `Play` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Play" ADD COLUMN     "machineId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "note",
ADD COLUMN     "playId" TEXT;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
