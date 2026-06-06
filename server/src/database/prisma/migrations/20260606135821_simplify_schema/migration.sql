/*
  Warnings:

  - You are about to drop the column `modelId` on the `Inspection` table. All the data in the column will be lost.
  - You are about to drop the `AIModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DatasetVersion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanModule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prediction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AIModel" DROP CONSTRAINT "AIModel_companyId_fkey";

-- DropForeignKey
ALTER TABLE "AIModel" DROP CONSTRAINT "AIModel_datasetId_fkey";

-- DropForeignKey
ALTER TABLE "AIModel" DROP CONSTRAINT "AIModel_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyModule" DROP CONSTRAINT "CompanyModule_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyModule" DROP CONSTRAINT "CompanyModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "DatasetVersion" DROP CONSTRAINT "DatasetVersion_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_inspectionId_fkey";

-- DropForeignKey
ALTER TABLE "Inspection" DROP CONSTRAINT "Inspection_modelId_fkey";

-- DropForeignKey
ALTER TABLE "PlanModule" DROP CONSTRAINT "PlanModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "PlanModule" DROP CONSTRAINT "PlanModule_planId_fkey";

-- DropForeignKey
ALTER TABLE "Prediction" DROP CONSTRAINT "Prediction_inspectionId_fkey";

-- DropIndex
DROP INDEX "Inspection_modelId_idx";

-- AlterTable
ALTER TABLE "Inspection" DROP COLUMN "modelId";

-- DropTable
DROP TABLE "AIModel";

-- DropTable
DROP TABLE "CompanyModule";

-- DropTable
DROP TABLE "DatasetVersion";

-- DropTable
DROP TABLE "Feedback";

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "PlanModule";

-- DropTable
DROP TABLE "Prediction";

-- DropEnum
DROP TYPE "FeedbackType";

-- CreateIndex
CREATE INDEX "Inspection_userId_idx" ON "Inspection"("userId");

-- CreateIndex
CREATE INDEX "Upload_userId_idx" ON "Upload"("userId");
