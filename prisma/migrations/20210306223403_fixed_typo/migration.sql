/*
  Warnings:

  - You are about to drop the column `upvotes` on the `recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `upvotes`,
    ADD COLUMN     `up_votes` INTEGER NOT NULL DEFAULT 0;
