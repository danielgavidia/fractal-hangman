/*
  Warnings:

  - You are about to drop the column `gameServerId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `GameServer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_gameServerId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "gameServerId";

-- DropTable
DROP TABLE "GameServer";
