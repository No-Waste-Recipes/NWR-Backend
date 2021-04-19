/*
  Warnings:

  - You are about to drop the column `super_user` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `super_user`,
    ADD COLUMN     `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
