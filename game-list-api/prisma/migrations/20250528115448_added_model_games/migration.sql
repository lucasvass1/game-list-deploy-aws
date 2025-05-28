-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PLAYING', 'DONE', 'ABANDONED');

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "GameStatus" NOT NULL,
    "categoryId" TEXT NOT NULL,
    "plataformId" TEXT,
    "imageUrl" TEXT,
    "description" TEXT,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_plataformId_fkey" FOREIGN KEY ("plataformId") REFERENCES "plataform"("id") ON DELETE SET NULL ON UPDATE CASCADE;
