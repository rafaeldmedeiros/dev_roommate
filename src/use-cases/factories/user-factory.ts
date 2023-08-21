import { PrismaUserRepository } from '@/repositories/prisma.user.repository';
import { UserUseCase } from '../user';

export function userFactory() {
    const userRepository = new PrismaUserRepository();
    const userUseCase = new UserUseCase(userRepository);

    return userUseCase;
}