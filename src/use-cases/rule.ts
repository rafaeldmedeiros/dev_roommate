import { RulesRepository } from '@/repositories/prisma/rules-repository';

interface CreateRulesUseCaseRequest {
    description: string;
    accepted: boolean;
    houseId: string;
}

export class RuleUseCase {
    constructor(private rulesRepository: RulesRepository) { }

    async create({ description, accepted, houseId }: CreateRulesUseCaseRequest) {
        await this.rulesRepository.create({
            description,
            accepted,
            house_id: houseId
        });
    }

    async findRuleByHouseId(id: string) {
        return await this.rulesRepository.getRulesByHouseId(id);
    }
}