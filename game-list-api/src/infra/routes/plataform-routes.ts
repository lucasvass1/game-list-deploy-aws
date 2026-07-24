import { Request, Response, Router } from 'express';
import { PlataformsController } from '../http/controllers/plataform/plataform-controller';
import { PrismaPlataformRepository } from '../database/prisma/repositories/prisma-plataform-repository';
import { ensureAuthenticated } from '../http/middlewares/ensure-authenticated';
import { PlataformProps } from '@/domain/entities/plataform';
import { PlataformAlreadyExistsError } from '@/domain/errors/plataform-already-exists-error';
import { PlataformNotFoundError } from '@/domain/errors/plataform-not-found';
import { UnauthorizedError } from '@/domain/errors/unauthorized-error';

const plataformRoutes = Router();
const plataformController = new PlataformsController(
  new PrismaPlataformRepository(),
);

plataformRoutes.post(
  '/',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'Requisição inválida.' });
        return;
      }
      if (!req.body.title) {
        res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
        return;
      }
      const { id } = req.user;
      const { title, company, imageUrl, acquisitionYear } = req.body;
      const plataform = await plataformController.create({
        userId: id,
        title,
        acquisitionYear,
        company,
        imageUrl,
        createdAt: new Date(),
      } as PlataformProps);
      res.status(201).json(plataform);
      return;
    } catch (error) {
      console.log('error register', error);
      if (error instanceof PlataformAlreadyExistsError) {
        res.status(409).json({ message: 'Plataforma já existe.' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor.' });
      return;
    }
  },
);

plataformRoutes.get(
  '/',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'Requisição inválida.' });
        return;
      }

      const { id: userId } = req.user;

      const {
        page = '1',
        limit = '10',
        sortBy = 'createdAt',
        order = 'desc',
      } = req.query;

      const plataforms = await plataformController.list({
        page: Number(page),
        limit: Number(limit),
        sortBy: sortBy as
          | 'tilte'
          | 'createdAt'
          | 'updatedAt'
          | 'acquisitionYear',
        order: order as 'asc' | 'desc',
        userId,
      });
      res.status(200).json(plataforms);
      return;
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
      return;
    }
  },
);

plataformRoutes.put(
  '/:id',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
        return;
      }

      if (!req.user) {
        res.status(400).json({ message: 'Requisição inválida.' });
        return;
      }

      const { id: userId } = req.user;

      const { title, acquisitionYear, company, imageUrl } = req.body;
      const plataform = await plataformController.update(
        {
          id,
          title,
          acquisitionYear,
          company,
          imageUrl,
          updatedAt: new Date(),
        } as PlataformProps,
        userId,
      );
      res.status(200).json(plataform);
      return;
    } catch (error) {
      console.log('error', error);
      if (error instanceof UnauthorizedError) {
        res
          .status(403)
          .json({ message: 'Você não tem permissão para realizar esta ação.' });
        return;
      }
      if (error instanceof PlataformNotFoundError) {
        res.status(404).json({ message: 'Plataforma não encontrada.' });
        return;
      }
      res.status(500).json({ message: 'Erro interno do servidor.' });
      return;
    }
  },
);

plataformRoutes.delete(
  '/:id',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
        return;
      }

      if (!req.user) {
        res.status(400).json({ message: 'Requisição inválida.' });
        return;
      }

      const { id: userId } = req.user;

      await plataformController.delete(id, userId);
      res.status(200).json({ message: 'Plataforma excluída.' });
      return;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        res
          .status(403)
          .json({ message: 'Você não tem permissão para realizar esta ação.' });
        return;
      }
      if (error instanceof PlataformNotFoundError) {
        res.status(404).json({ message: 'Plataforma não encontrada.' });
        return;
      }
      console.log('error', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
      return;
    }
  },
);

export { plataformRoutes };
