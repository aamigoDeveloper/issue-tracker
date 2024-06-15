/*
  Warnings:

  - You are about to drop the column `usesrId` on the `issues` table. All the data in the column will be lost.
  - Added the required column `userId` to the `issues` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `issues` DROP FOREIGN KEY `issues_usesrId_fkey`;

-- AlterTable
ALTER TABLE `issues` DROP COLUMN `usesrId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
