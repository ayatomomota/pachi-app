-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "no" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "diff" INTEGER NOT NULL,
    "startCount" INTEGER,
    "note" TEXT,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);
