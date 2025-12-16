-- AlterTable
CREATE SEQUENCE record_no_seq;
ALTER TABLE "Record" ALTER COLUMN "no" SET DEFAULT nextval('record_no_seq');
ALTER SEQUENCE record_no_seq OWNED BY "Record"."no";
