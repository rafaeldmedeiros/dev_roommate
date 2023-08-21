import { PrismaRuleRepository } from '@/repositories/prisma.rule.repositpory';
import { RuleUseCase } from '@/use-cases/rule';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const ruleRepository = new PrismaRuleRepository();
const ruleUseCase = new RuleUseCase(ruleRepository);

export async function createRule(request: FastifyRequest, reply: FastifyReply) {
    const createRuleBodySchemma = z.object({
        description: z.string(),
        accepted: z.boolean()
    });

    const createRuleParamSchemma = z.object({
        houseId: z.string().uuid()
    });
    const { description, accepted } = createRuleBodySchemma.parse(request.body);
    const { houseId } = createRuleParamSchemma.parse(request.params);

    await ruleUseCase.create({ description, accepted, houseId });

    return reply.status(201).send();
}

export async function findByHouseId(request: FastifyRequest, reply: FastifyReply) {

    const findRulearamSchema = z.object({
        houseId: z.string().uuid(),
    });
    const { houseId } = findRulearamSchema.parse(request.params);

    const rules = await ruleRepository.getRulesByHouseId(houseId);

    return reply.status(200).send(rules);

}