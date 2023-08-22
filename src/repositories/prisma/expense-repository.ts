import { Prisma, Expense } from '@prisma/client';

export interface ExpenseRepository {
    create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>;
    getExpensesByHouseId(id: string): Promise<Expense[] | null>
}