/*
  Warnings:

  - You are about to drop the `contactInquiry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "contactInquiry";

-- CreateTable
CREATE TABLE "inquiry" (
    "id" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "phone" TEXT,
    "projectType" TEXT,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "inquiryStatus" NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inquiry_pkey" PRIMARY KEY ("id")
);
