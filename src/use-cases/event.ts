import { EventRepository } from '@/repositories/prisma/event-repository';

interface CreateEvent {
    description: string;
    event_date: string;
    user_id: string;
}

export class EventUseCase {
    constructor(private eventRepository: EventRepository) { }

    async create({ description, event_date, user_id }: CreateEvent) {
        await this.eventRepository.create({
            description,
            event_date,
            user_id
        });
    }

    async findEventById(id: string) {
        return await this.eventRepository.list(id);
    }
}