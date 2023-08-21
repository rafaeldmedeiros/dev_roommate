import { UserRepository } from '@/repositories/prisma/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string,
    phone: string
}

export class UserUseCase {
    constructor(private userRepository: UserRepository) { }

    async register({ name, email, password, phone }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        await this.userRepository.create({
            admin: false,
            email,
            name,
            password_hash,
            phone
        });
    }

    async findById(id: string) {
        const user = await this.userRepository.findById(id);

        return user;
    }
}