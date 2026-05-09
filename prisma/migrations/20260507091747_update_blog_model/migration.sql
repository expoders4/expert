-- CreateEnum
CREATE TYPE "blogStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "blog" ADD COLUMN     "category" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "metaDescription" TEXT,
ADD COLUMN     "metaTitle" TEXT,
ADD COLUMN     "publishedAt" TIMESTAMP(3),
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "blogStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "tags" JSONB,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "blog_slug_idx" ON "blog"("slug");

-- CreateIndex
CREATE INDEX "blog_published_idx" ON "blog"("published");

-- CreateIndex
CREATE INDEX "blog_category_idx" ON "blog"("category");
