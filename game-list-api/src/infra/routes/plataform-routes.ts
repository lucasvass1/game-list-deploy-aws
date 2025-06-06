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
        res.status(400).json({ message: 'Bad request.' });
        return;
      }
      if (!req.body.title) {
        res.status(400).json({ message: 'Missing required fields.' });
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
        res.status(409).json({ message: 'Plataform already exists.' });
        return;
      }
      res.status(500).json({ message: 'Internal server error.' });
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
        res.status(400).json({ message: 'Bad request.' });
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
      res.status(500).json({ message: 'Internal server error.' });
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
        res.status(400).json({ message: 'Missing required fields.' });
        return;
      }

      if (!req.user) {
        res.status(400).json({ message: 'Bad request.' });
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
          .json({ message: 'You are not authorized to perform this action.' });
        return;
      }
      if (error instanceof PlataformNotFoundError) {
        res.status(404).json({ message: 'Plataform not found.' });
        return;
      }
      res.status(500).json({ message: 'Internal server error.' });
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
        res.status(400).json({ message: 'Missing required fields.' });
        return;
      }

      if (!req.user) {
        res.status(400).json({ message: 'Bad request.' });
        return;
      }

      const { id: userId } = req.user;

      await plataformController.delete(id, userId);
      res.status(200).json({ message: 'Plataform deleted.' });
      return;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        res
          .status(403)
          .json({ message: 'You are not authorized to perform this action.' });
        return;
      }
      if (error instanceof PlataformNotFoundError) {
        res.status(404).json({ message: 'Plataform not found.' });
        return;
      }
      console.log('error', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

export { plataformRoutes };
