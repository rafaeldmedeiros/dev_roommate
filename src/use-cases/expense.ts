import { ExpenseRepository } from '@/repositories/prisma/expense-repository';

interface CreateExpenseUseCase {
    description: string;
    value: number;
    due_date: string;
    houseId: string;
}

export class ExpenseUseCase {
    constructor(private expenseRepository: ExpenseRepository) { }

    async create({ description, value, due_date, houseId }: CreateExpenseUseCase) {
        await this.expenseRepository.create({
            description,
            value,
            due_date,
            house_id: houseId
        });
    }

    async findRuleByHouseId(id: string) {
        return await this.expenseRepository.getExpensesByHouseId(id);
    }
}