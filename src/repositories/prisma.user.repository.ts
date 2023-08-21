import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UserRepository } from './prisma/users-repository';
import { GetResult } from '@prisma/client/runtime';

export class PrismaUserRepository implements UserRepository {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data
        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        return user;
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                house: {
                    include: {
                        Rule: true,
                        Users: true
                    }
                }
            }
        });
        return user;
    }
}