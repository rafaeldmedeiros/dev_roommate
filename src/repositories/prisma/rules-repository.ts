import { Prisma, Rule } from '@prisma/client';

export interface RulesRepository {
    create(data: Prisma.RuleUncheckedCreateInput): Promise<Rule>
    getRulesByHouseId(id: string): Promise<Rule[] | null>
    acceptRule(id: string, userId: string): void
}