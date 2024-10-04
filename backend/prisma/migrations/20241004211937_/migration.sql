/*
  Warnings:

  - Made the column `gameId` on table `AnswerLetterObj` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gameId` on table `HangmanObj` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gameId` on table `KeyboardLetterObj` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AnswerLetterObj" DROP CONSTRAINT "AnswerLetterObj_gameId_fkey";

-- DropForeignKey
ALTER TABLE "HangmanObj" DROP CONSTRAINT "HangmanObj_gameId_fkey";

-- DropForeignKey
ALTER TABLE "KeyboardLetterObj" DROP CONSTRAINT "KeyboardLetterObj_gameId_fkey";

-- AlterTable
ALTER TABLE "AnswerLetterObj" ALTER COLUMN "gameId" SET NOT NULL;

-- AlterTable
ALTER TABLE "HangmanObj" ALTER COLUMN "gameId" SET NOT NULL;

-- AlterTable
ALTER TABLE "KeyboardLetterObj" ALTER COLUMN "gameId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "AnswerLetterObj" ADD CONSTRAINT "AnswerLetterObj_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyboardLetterObj" ADD CONSTRAINT "KeyboardLetterObj_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HangmanObj" ADD CONSTRAINT "HangmanObj_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
