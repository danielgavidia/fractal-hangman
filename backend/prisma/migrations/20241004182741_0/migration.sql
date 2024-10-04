-- CreateTable
CREATE TABLE "GameServer" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "serverId" TEXT NOT NULL,

    CONSTRAINT "GameServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gameId" TEXT NOT NULL DEFAULT '',
    "gameName" TEXT NOT NULL DEFAULT '',
    "gameLive" BOOLEAN NOT NULL DEFAULT true,
    "gameWon" BOOLEAN NOT NULL DEFAULT false,
    "wrongCount" INTEGER NOT NULL DEFAULT 0,
    "wrongMax" INTEGER NOT NULL DEFAULT 0,
    "difficulty" TEXT NOT NULL DEFAULT 'easy',
    "gameServerId" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerLetterObj" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "letter" TEXT NOT NULL DEFAULT 'a',
    "shown" BOOLEAN NOT NULL DEFAULT false,
    "gameId" TEXT,

    CONSTRAINT "AnswerLetterObj_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyboardLetterObj" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "letter" TEXT NOT NULL DEFAULT 'a',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "correct" BOOLEAN NOT NULL DEFAULT true,
    "gameId" TEXT,

    CONSTRAINT "KeyboardLetterObj_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HangmanObj" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "figurine" TEXT NOT NULL DEFAULT '',
    "gameId" TEXT,

    CONSTRAINT "HangmanObj_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameServerId_fkey" FOREIGN KEY ("gameServerId") REFERENCES "GameServer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerLetterObj" ADD CONSTRAINT "AnswerLetterObj_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyboardLetterObj" ADD CONSTRAINT "KeyboardLetterObj_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HangmanObj" ADD CONSTRAINT "HangmanObj_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE SET NULL ON UPDATE CASCADE;
