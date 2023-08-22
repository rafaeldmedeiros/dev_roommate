import { PrismaExpenseRepository } from '@/repositories/prisma.expense.repository';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ExpenseUseCase } from '@/use-cases/expense';

const expenseRepository = new PrismaExpenseRepository();
const expenseUseCase = new ExpenseUseCase(expenseRepository);

export async function createExpense(request: FastifyRequest, reply: FastifyReply) {
    const createExpenseBodySchemma = z.object({
        description: z.string(),
        value: z.number(),
        due_date: z.string(),
    });

    const createRuleParamSchemma = z.object({
        houseId: z.string().uuid()
    });
    const { description, value, due_date, } = createExpenseBodySchemma.parse(request.body);
    const { houseId } = createRuleParamSchemma.parse(request.params);

    await expenseUseCase.create({ description, value, due_date, houseId });

    return reply.status(201).send();
}

export async function findByExpenseId(request: FastifyRequest, reply: FastifyReply) {

    const findExpenseSchema = z.object({
        houseId: z.string().uuid(),
    });
    const { houseId } = findExpenseSchema.parse(request.params);

    const expenses = await expenseRepository.getExpensesByHouseId(houseId);

    return reply.status(200).send(expenses);

}

