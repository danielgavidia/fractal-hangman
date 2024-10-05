-- CreateTable
CREATE TABLE "GameServer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "games" JSONB NOT NULL,

    CONSTRAINT "GameServer_pkey" PRIMARY KEY ("id")
);
