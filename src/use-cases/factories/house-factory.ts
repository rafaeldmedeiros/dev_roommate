import { PrismaHouseRepository } from '@/repositories/prisma.house.repository';
import { HouseUseCase } from '../house';

export function houseFactory() {
    const houseRepository = new PrismaHouseRepository();
    const houseUseCase = new HouseUseCase(houseRepository);

    return houseUseCase;
}