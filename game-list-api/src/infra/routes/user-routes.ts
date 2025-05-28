import { Router } from 'express';
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository';
import { Request, Response } from 'express';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { UsersController } from '../http/controllers/users/users-controller';
import { UsersAlreadyExistsError } from '@/domain/errors/users-already-exists-error';
import { ensureAuthenticated } from '../http/middlewares/ensure-authenticated';

const userRoutes = Router();
const usersController = new UsersController(new PrismaUsersRepository());

userRoutes.post('/login', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.status(401).json({ message: 'Missing Authorization header.' });
      return;
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );

    const [email, password] = credentials.split(':');

    if (!email || !password) {
      res.status(400).json({ message: 'Invalid Authorization format.' });
      return;
    }
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

userRoutes.get(
  '/stats',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (req.user) {
        const { id } = req.user;

        if (!id) {
          res.status(400).json({ message: 'Bad request' });
          return;
        }

        const stats = await usersController.stats(id);
        res.status(200).json(stats);
        return;
      }
      res.status(400).json({ message: 'Bad request.' });
      return;
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

export { userRoutes };
