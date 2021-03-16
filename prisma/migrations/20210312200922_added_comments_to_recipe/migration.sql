/*
  Warnings:

  - Added the required column `recipeId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN     `recipeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comments` ADD FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
