import { UserRepository } from '@/repositories/prisma/users-repository';
import { compare } from 'bcryptjs';
import { User } from '@prisma/client';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

interface AuthUseCaseRequest {
    email: string;
    password: string
}

interface AuthUseCaseResponse {
    user: User
}

export class AuthenticationUseCase {
    constructor(private usersRepository: UserRepository) { }

    async execute({ email, password }: AuthUseCaseRequest): Promise<AuthUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}