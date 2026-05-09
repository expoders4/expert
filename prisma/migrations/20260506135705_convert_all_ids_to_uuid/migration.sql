/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `contactInquiry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "blog" DROP CONSTRAINT "blog_authorId_fkey";

-- AlterTable
ALTER TABLE "admin" DROP CONSTRAINT "admin_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "admin_id_seq";

-- AlterTable
ALTER TABLE "blog" DROP CONSTRAINT "blog_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "blog_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "blog_id_seq";

-- AlterTable
ALTER TABLE "contactInquiry" DROP CONSTRAINT "contactInquiry_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "contactInquiry_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "contactInquiry_id_seq";

-- AlterTable
ALTER TABLE "project" DROP CONSTRAINT "project_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "project_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "project_id_seq";

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
