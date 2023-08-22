import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { ExpenseRepository } from './prisma/expense-repository';

export class PrismaExpenseRepository implements ExpenseRepository {
    async create(data: Prisma.ExpenseUncheckedCreateInput) {
        const expense = await prisma.expense.create({ data });

        return expense;
    }

    async getExpensesByHouseId(id: string) {
        const expenses = await prisma.expense.findMany({
            where: {
                house_id: id
            },
        });

        return expenses;
    }
}