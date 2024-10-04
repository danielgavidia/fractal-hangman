/*
  Warnings:

  - A unique constraint covering the columns `[gameId,letter]` on the table `AnswerLetterObj` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gameId,letter]` on the table `KeyboardLetterObj` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AnswerLetterObj_gameId_letter_key" ON "AnswerLetterObj"("gameId", "letter");

-- CreateIndex
CREATE UNIQUE INDEX "KeyboardLetterObj_gameId_letter_key" ON "KeyboardLetterObj"("gameId", "letter");
