/*
  Warnings:

  - You are about to drop the `UserRules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserRules" DROP CONSTRAINT "UserRules_fk_id_rule_fkey";

-- DropForeignKey
ALTER TABLE "UserRules" DROP CONSTRAINT "UserRules_fk_id_user_fkey";

-- DropTable
DROP TABLE "UserRules";

-- CreateTable
CREATE TABLE "users_rules" (
    "id" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "fk_id_rule" TEXT NOT NULL,

    CONSTRAINT "users_rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_rules" ADD CONSTRAINT "users_rules_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_rules" ADD CONSTRAINT "users_rules_fk_id_rule_fkey" FOREIGN KEY ("fk_id_rule") REFERENCES "rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
