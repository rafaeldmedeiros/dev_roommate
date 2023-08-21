import { Prisma } from '@prisma/client';
import { RulesRepository } from './prisma/rules-repository';
import { prisma } from '@/lib/prisma';
import { GetResult } from '@prisma/client/runtime';

export class PrismaRuleRepository implements RulesRepository {
    async create(data: Prisma.RuleUncheckedCreateInput) {
        const rule = await prisma.rule.create({ data });

        return rule;
    }

    async getRulesByHouseId(id: string) {
        const rules = await prisma.rule.findMany({
            where: {
                house_id: id
            }
        });

        return rules;
    }
}