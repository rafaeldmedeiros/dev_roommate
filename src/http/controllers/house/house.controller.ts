import { houseFactory } from '@/use-cases/factories/house-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const houseUseCase = houseFactory();

export async function createHouse(request: FastifyRequest, reply: FastifyReply) {
    const createHouseBodySchemma = z.object({
        name: z.string(),
    });
    const { name } = createHouseBodySchemma.parse(request.body);


    await houseUseCase.create({ name });

    return reply.status(201).send();
}

export async function findHouseById(request: FastifyRequest, reply: FastifyReply) {

    const findHouseParamSchema = z.object({
        id: z.string().uuid(),
    });
    const { id } = findHouseParamSchema.parse(request.params);

    const house = await houseUseCase.findHouseById(id);

    return reply.status(200).send(house);

}