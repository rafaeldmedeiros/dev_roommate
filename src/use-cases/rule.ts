import { RulesRepository } from '@/repositories/prisma/rules-repository';

interface CreateRulesUseCaseRequest {
    description: string;
    houseId: string;
}

export class RuleUseCase {
    constructor(private rulesRepository: RulesRepository) { }

    async create({ description, houseId }: CreateRulesUseCaseRequest) {
        await this.rulesRepository.create({
            description,
            house_id: houseId
        });
    }

    async findRuleByHouseId(id: string) {
        return await this.rulesRepository.getRulesByHouseId(id);
    }

    async accept(id: string, userId: string) {
        return await this.rulesRepository.acceptRule(id, userId);
    }
}