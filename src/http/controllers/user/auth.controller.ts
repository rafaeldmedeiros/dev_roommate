import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { authFactory } from '@/use-cases/factories/auth-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authBodySchemma = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    });
    const { email, password } = authBodySchemma.parse(request.body);

    try {
        const authUseCase = authFactory();
        const { user } = await authUseCase.execute({
            email,
            password,
        });

        const token = await reply.jwtSign({ isAdmin: user.admin }, {
            sign: {
                sub: user.id,
            }
        });

        return reply.status(200).send({ token });


    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: error.message });
        }
        throw error;
    }
}