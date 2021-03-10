/*
  Warnings:

  - You are about to drop the column `recipeId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `ingredient` DROP FOREIGN KEY `ingredient_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tag` DROP FOREIGN KEY `tag_ibfk_1`;

-- AlterTable
ALTER TABLE `comments` DROP COLUMN `recipeId`;

-- AlterTable
ALTER TABLE `ingredient` DROP COLUMN `recipeId`,
    MODIFY `description` VARCHAR(191);

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `recipeId`;
