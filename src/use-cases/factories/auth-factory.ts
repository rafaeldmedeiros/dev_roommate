import { PrismaUserRepository } from '@/repositories/prisma.user.repository';
import { AuthenticationUseCase } from '../authentication';

export function authFactory() {
    const userRepository = new PrismaUserRepository();
    const authUseCase = new AuthenticationUseCase(userRepository);

    return authUseCase;
}