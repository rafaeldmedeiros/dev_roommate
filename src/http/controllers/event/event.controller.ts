import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PrismaEventRepository } from '@/repositories/prisma.event.repository';
import { EventUseCase } from '@/use-cases/event';

const eventRepository = new PrismaEventRepository();
const eventUseCase = new EventUseCase(eventRepository);

export async function createEvent(request: FastifyRequest, reply: FastifyReply) {
    const createEventBodySchemma = z.object({
        description: z.string(),
        event_date: z.string(),
    });

    const createEventParamSchemma = z.object({
        userId: z.string().uuid()
    });
    const { description, event_date, } = createEventBodySchemma.parse(request.body);
    const { userId } = createEventParamSchemma.parse(request.params);

    await eventUseCase.create({ description, event_date, user_id: userId });

    return reply.status(201).send();
}

export async function findEvenByUserId(request: FastifyRequest, reply: FastifyReply) {

    const findEventSchema = z.object({
        userId: z.string().uuid(),
    });
    const { userId } = findEventSchema.parse(request.params);

    const event = await eventUseCase.findEventById(userId);

    return reply.status(200).send(event);

}

