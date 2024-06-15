/*
  Warnings:

  - Added the required column `usesrId` to the `issues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issues` ADD COLUMN `usesrId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `issues` ADD CONSTRAINT `issues_usesrId_fkey` FOREIGN KEY (`usesrId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
