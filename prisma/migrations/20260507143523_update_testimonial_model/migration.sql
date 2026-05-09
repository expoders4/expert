/*
  Warnings:

  - You are about to drop the column `message` on the `testimonial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "testimonial" DROP COLUMN "message",
ADD COLUMN     "content" TEXT NOT NULL DEFAULT '';
