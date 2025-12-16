-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_playId_fkey";

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_playId_fkey" FOREIGN KEY ("playId") REFERENCES "Play"("id") ON DELETE CASCADE ON UPDATE CASCADE;
