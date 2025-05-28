import { User } from "@/domain/entities/user";
import { UsersAlreadyExistsError } from "@/domain/errors/users-already-exists-error";
import { PrismaUsersRepository } from "@/infra/database/prisma/repositories/prisma-users-repository";
import { hash } from "bcryptjs";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UsersAlreadyExistsError();
    }

    const passwordHash = await hash(password, 8);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    await this.usersRepository.create(user);

    return { user };
  }
}
