-- DropForeignKey
ALTER TABLE "Play" DROP CONSTRAINT "Play_machineId_fkey";

-- AlterTable
ALTER TABLE "Play" ALTER COLUMN "machineId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Play" ADD CONSTRAINT "Play_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "Machine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
