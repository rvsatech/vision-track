-- DropForeignKey
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_uploadId_fkey";

-- AlterTable
ALTER TABLE "Inspection" ALTER COLUMN "uploadId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_uploadId_fkey" FOREIGN KEY ("uploadId") REFERENCES "Upload"("id") ON DELETE SET NULL ON UPDATE CASCADE;
