import { Router } from 'express';
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository';
import { Request, Response } from 'express';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UsersController } from '../http/controllers/users-controller';

const userRoutes = Router();
const usersController = new UsersController(new PrismaUsersRepository());

userRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await usersController.login(email, password);
    res.status(200).json(user);
    return;
  } catch (error) {
    console.log('error', error);
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
});

export { userRoutes };
