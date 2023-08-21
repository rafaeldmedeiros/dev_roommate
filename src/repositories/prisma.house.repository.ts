import { Prisma } from '@prisma/client';
import { HouseRepository } from './prisma/houses-repository';
import { prisma } from '@/lib/prisma';

export class PrismaHouseRepository implements HouseRepository {
    async create(data: Prisma.HouseCreateInput) {
        const house = prisma.house.create({ data });

        return house;
    }

    async findById(id: string) {
        const house = await prisma.house.findUnique({
            where: {
                id
            },
            include: {
                Users: true,
                Rule: true
            }
        });
        return house;
    }
}