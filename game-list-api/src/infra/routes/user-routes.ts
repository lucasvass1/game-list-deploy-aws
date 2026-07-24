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
      res.status(401).json({ message: 'Cabeçalho de autorização ausente.' });
      return;
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString(
      'utf-8',
    );

    const [email, password] = credentials.split(':');

    if (!email || !password) {
      res.status(400).json({ message: 'Formato de autorização inválido.' });
      return;
    }
    const user = await usersController.login(email, password);
    res.status(200).json(user);
    return;
  } catch (error) {
    console.log('error', error);
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({ message: 'Credenciais inválidas.' });
      return;
    }
    res.status(500).json({ message: 'Erro interno do servidor.' });
    return;
  }
});

userRoutes.post('/register', async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
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
      res.status(409).json({ message: 'Usuário já existe.' });
      return;
    }
    res.status(500).json({ message: 'Erro interno do servidor.' });
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
          res.status(400).json({ message: 'Requisição inválida' });
          return;
        }

        const stats = await usersController.stats(id);
        res.status(200).json(stats);
        return;
      }
      res.status(400).json({ message: 'Requisição inválida.' });
      return;
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
      return;
    }
  },
);

export { userRoutes };
