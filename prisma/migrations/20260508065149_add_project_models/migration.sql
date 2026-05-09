/*
  Warnings:

  - You are about to drop the column `category` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `gallery` on the `projects` table. All the data in the column will be lost.
  - The `status` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `subCategoryId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('CONCEPT', 'ONGOING', 'COMPLETED');

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "category",
DROP COLUMN "gallery",
ADD COLUMN     "subCategoryId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ProjectStatus";

-- DropEnum
DROP TYPE "projectCategories";

-- DropEnum
DROP TYPE "projectStatus";

-- CreateTable
CREATE TABLE "project_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_sub_categories" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_galleries" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_galleries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "project_categories_name_key" ON "project_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "project_categories_slug_key" ON "project_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "project_sub_categories_categoryId_slug_key" ON "project_sub_categories"("categoryId", "slug");

-- AddForeignKey
ALTER TABLE "project_sub_categories" ADD CONSTRAINT "project_sub_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "project_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "project_sub_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_galleries" ADD CONSTRAINT "project_galleries_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
