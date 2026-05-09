/*
  Warnings:

  - You are about to drop the column `email` on the `contactInquiry` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `contactInquiry` table. All the data in the column will be lost.
  - Added the required column `senderEmail` to the `contactInquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderName` to the `contactInquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `contactInquiry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "inquiryStatus" AS ENUM ('UNREAD', 'READ', 'REPLIED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "contactInquiry" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "senderEmail" TEXT NOT NULL,
ADD COLUMN     "senderName" TEXT NOT NULL,
ADD COLUMN     "status" "inquiryStatus" NOT NULL DEFAULT 'UNREAD',
ADD COLUMN     "subject" TEXT NOT NULL;
