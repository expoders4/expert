/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "projectCategories" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'INTERIOR', 'HOSPITALITY', 'URBAN', 'LANDSCAPE');

-- CreateEnum
CREATE TYPE "projectStatus" AS ENUM ('CONCEPT', 'ONGOING', 'COMPLETED');

-- DropTable
DROP TABLE "Project";

-- DropEnum
DROP TYPE "ProjectCategory";

-- DropEnum
DROP TYPE "ProjectStatus";

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "projectCategories" NOT NULL,
    "status" "projectStatus",
    "shortDescription" TEXT,
    "description" TEXT,
    "location" TEXT,
    "year" INTEGER,
    "clientName" TEXT,
    "area" TEXT,
    "thumbnail" TEXT,
    "coverImage" TEXT,
    "gallery" JSONB,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");
