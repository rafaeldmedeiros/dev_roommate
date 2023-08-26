import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { EventRepository } from './prisma/event-repository';

export class PrismaEventRepository implements EventRepository {
    async create(data: Prisma.EventUncheckedCreateInput) {
        const event = await prisma.event.create({ data });

        return event;
    }

    async list(id: string) {
        const event = await prisma.event.findMany({
            where: {
                user_id: id
            },
        });

        return event;
    }
}