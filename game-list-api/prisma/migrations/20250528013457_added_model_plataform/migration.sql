-- CreateTable
CREATE TABLE "plataform" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageUrl" TEXT,
    "company" TEXT,
    "acquisitionYear" TIMESTAMP(3),

    CONSTRAINT "plataform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plataform_title_key" ON "plataform"("title");
