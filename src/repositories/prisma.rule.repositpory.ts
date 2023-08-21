import { Prisma } from '@prisma/client';
import { RulesRepository } from './prisma/rules-repository';
import { prisma } from '@/lib/prisma';

export class PrismaRuleRepository implements RulesRepository {
    async create(data: Prisma.RuleUncheckedCreateInput) {
        const rule = await prisma.rule.create({ data });

        return rule;
    }

    async getRulesByHouseId(id: string) {
        const rules = await prisma.rule.findMany({
            where: {
                house_id: id
            },
            include: {
                UserRules: true
            }
        });

        return rules;
    }

    async acceptRule(id: string, userId: string) {
        await prisma.rule.update({
            where: {
                id
            },
            data: {
                UserRules: {
                    create: {
                        users: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                }
            }
        });
    }
}