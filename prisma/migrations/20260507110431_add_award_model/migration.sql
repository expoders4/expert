-- CreateTable
CREATE TABLE "award" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "organization" TEXT,
    "description" TEXT,
    "year" INTEGER,
    "location" TEXT,
    "image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "award_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "award_slug_key" ON "award"("slug");

-- CreateIndex
CREATE INDEX "award_slug_idx" ON "award"("slug");

-- CreateIndex
CREATE INDEX "award_published_idx" ON "award"("published");
