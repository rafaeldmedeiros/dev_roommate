-- CreateTable
CREATE TABLE "UserRules" (
    "id" TEXT NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    "fk_id_rule" TEXT NOT NULL,

    CONSTRAINT "UserRules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserRules" ADD CONSTRAINT "UserRules_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRules" ADD CONSTRAINT "UserRules_fk_id_rule_fkey" FOREIGN KEY ("fk_id_rule") REFERENCES "rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
