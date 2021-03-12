/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[slug]` on the table `Recipe`. If there are existing duplicate values, the migration will fail.
  - Added the required column `slug` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipe` ADD COLUMN     `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Recipe.slug_unique` ON `Recipe`(`slug`);
