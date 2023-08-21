import { HouseRepository } from '@/repositories/prisma/houses-repository';
import { User } from '@prisma/client';

interface CreateHouseUseCaseRequest {
    name: string,
    users?: User[]
}

export class HouseUseCase {
    constructor(private houseRepository: HouseRepository) { }

    async create({ name }: CreateHouseUseCaseRequest) {
        await this.houseRepository.create({
            name,
        });
    }

    async findHouseById(id: string) {
        const house = await this.houseRepository.findById(
            id,
        );

        return house;
    }
}