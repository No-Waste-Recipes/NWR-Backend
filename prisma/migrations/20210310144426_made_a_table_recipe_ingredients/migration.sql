/*
  Warnings:

  - You are about to drop the column `up_votes` on the `recipe` table. All the data in the column will be lost.
  - You are about to drop the `_ingredienttorecipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_ingredienttorecipe` DROP FOREIGN KEY `_ingredienttorecipe_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_ingredienttorecipe` DROP FOREIGN KEY `_ingredienttorecipe_ibfk_2`;

-- AlterTable
ALTER TABLE `recipe` DROP COLUMN `up_votes`;

-- DropTable
DROP TABLE `_ingredienttorecipe`;

-- CreateTable
CREATE TABLE `RecipeIngredients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `recipeId` INTEGER NOT NULL,
    `ingredientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RecipeIngredients` ADD FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIngredients` ADD FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
