import { House, Prisma } from '@prisma/client';

export interface HouseRepository {
    create(data: Prisma.HouseCreateInput): Promise<House>;
    findById(id: string): Promise<House | null>;
}