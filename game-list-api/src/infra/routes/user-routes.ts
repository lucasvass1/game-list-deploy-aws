import { Router } from 'express';
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository';
import { Request, Response } from 'express';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UsersController } from '../http/controllers/users/users-controller';
import { UsersAlreadyExistsError } from '@/domain/errors/users-already-exists-error';

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

userRoutes.post('/register', async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400).json({ message: 'Missing required fields.' });
      return;
    }
    const user = await usersController.register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(201).json(user);
    return;
  } catch (error) {
    console.log('error register', error);
    if (error instanceof UsersAlreadyExistsError) {
      res.status(409).json({ message: 'User already exists.' });
      return;
    }
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
});

export { userRoutes };
