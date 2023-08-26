import { Prisma, Event } from '@prisma/client';

export interface EventRepository {
    create(data: Prisma.EventUncheckedCreateInput): Promise<Event>;
    list(userId: string): Promise<Event[]>
}