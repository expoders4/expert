-- CreateTable
CREATE TABLE "feature" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "image" TEXT,
    "category" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feature_slug_key" ON "feature"("slug");

-- CreateIndex
CREATE INDEX "feature_slug_idx" ON "feature"("slug");

-- CreateIndex
CREATE INDEX "feature_published_idx" ON "feature"("published");

-- CreateIndex
CREATE INDEX "feature_category_idx" ON "feature"("category");
