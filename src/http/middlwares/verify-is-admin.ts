import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyIsAdmin(request: FastifyRequest, reply: FastifyReply) {
    const admin = request.user.isAdmin;

    if (!admin) {
        return reply.status(401).send({ message: 'You are not authorized to realize this action' });
    }
}