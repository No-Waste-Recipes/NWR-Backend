-- AlterTable
ALTER TABLE `comment` ADD COLUMN `reported` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `recipe` ADD COLUMN `reported` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `status` ENUM('APPROVED', 'TO_BE_APPROVED', 'PRIVATE', 'DENIED') NOT NULL DEFAULT 'TO_BE_APPROVED';

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';