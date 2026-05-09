/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `testimonial` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "testimonialStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "testimonial" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "testimonialStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "published" SET DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "testimonial_slug_key" ON "testimonial"("slug");

-- CreateIndex
CREATE INDEX "testimonial_status_idx" ON "testimonial"("status");
