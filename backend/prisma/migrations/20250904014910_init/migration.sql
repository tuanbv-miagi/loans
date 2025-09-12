-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `spamZalo` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `avatarUrl` VARCHAR(191) NOT NULL,
    `role` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `lastLogin` DATETIME(3) NULL,
    `deletedAt` DATETIME NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `nationalId` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `isSpamZalo` INTEGER NOT NULL DEFAULT 0,
    `isSpamIcloud` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    UNIQUE INDEX `Customer_phone_key`(`phone`),
    UNIQUE INDEX `Customer_nationalId_key`(`nationalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `icloud` VARCHAR(191) NOT NULL,
    `idCardFront` VARCHAR(191) NOT NULL,
    `idCardBack` VARCHAR(191) NOT NULL,
    `idCardIssueDate` DATETIME NULL,
    `idCardIssuePlace` VARCHAR(191) NOT NULL,
    `contactPhone1` VARCHAR(191) NOT NULL,
    `contactPhone2` VARCHAR(191) NOT NULL,
    `contactPhone3` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `bankAccountNumber` VARCHAR(191) NOT NULL,
    `bankAccountName` VARCHAR(191) NOT NULL,
    `workplaceName` VARCHAR(191) NOT NULL,
    `workplaceAddress` VARCHAR(191) NOT NULL,
    `urlImages` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME NULL,

    UNIQUE INDEX `CustomerInfo_customerId_key`(`customerId`),
    UNIQUE INDEX `CustomerInfo_icloud_key`(`icloud`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Loan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `loanCode` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `interestRate` DECIMAL(5, 2) NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dueDate` DATETIME NULL,
    `dayAmount` DECIMAL(15, 2) NOT NULL,
    `receivedAmount` DECIMAL(15, 2) NOT NULL,
    `paidAmount` DECIMAL(15, 2) NOT NULL,
    `sevenDayOfAmount` DECIMAL(15, 2) NOT NULL,
    `status` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME NULL,

    UNIQUE INDEX `Loan_loanCode_key`(`loanCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerInfo` ADD CONSTRAINT `CustomerInfo_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
