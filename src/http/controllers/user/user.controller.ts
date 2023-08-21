import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { userFactory } from '@/use-cases/factories/user-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

const registerUseCase = userFactory();

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchemma = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string()
    });
    const { name, email, password, phone } = registerBodySchemma.parse(request.body);

    try {

        await registerUseCase.register({
            name,
            email,
            password,
            phone
        });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error;
    }

    return reply.send(201);
}

export async function findUserById(request: FastifyRequest, reply: FastifyReply) {

    const findUserParamSchema = z.object({
        id: z.string().uuid(),
    });
    const { id } = findUserParamSchema.parse(request.params);

    try {

        const user = await registerUseCase.findById(id);

        return reply.status(200).send(user);
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: error.message });
        }
        throw error;
    }
}