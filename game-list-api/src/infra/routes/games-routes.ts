import { Request, Response, Router } from 'express';
import { GamesController } from '../http/controllers/games/games-controller';
import { PrismaGameRepository } from '../database/prisma/repositories/prisma-games-repository';
import { ensureAuthenticated } from '../http/middlewares/ensure-authenticated';
import { InvalidStatusGameError } from '@/domain/errors/invalid-status-game';
import { EndDateGameRequiredError } from '@/domain/errors/end-date-game-required';
import { GameNotFoundError } from '@/domain/errors/game-not-found';

const gamesRoutes = Router();
const gamesController = new GamesController(new PrismaGameRepository());

gamesRoutes.post(
  '/',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const {
        title,
        description,
        categoryId,
        plataformId,
        imageUrl,
        endDate,
        status,
      } = req.body;

      if (!title || !status || !categoryId) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
      }

      const game = await gamesController.create({
        title,
        description,
        categoryId,
        plataformId,
        imageUrl,
        endDate,
        status,
      });
      res.status(201).json(game);
      return;
    } catch (error) {
      console.log('error', error);
      if (error instanceof InvalidStatusGameError) {
        res.status(400).json({ message: 'Invalid status game.' });
        return;
      }
      if (error instanceof EndDateGameRequiredError) {
        res.status(400).json({
          message: 'End date is required when status is DONE or ABANDONED',
        });
        return;
      }
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);
gamesRoutes.put(
  '/:id',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
      }

      const {
        title,
        description,
        categoryId,
        plataformId,
        imageUrl,
        endDate,
        status,
      } = req.body;

      const game = await gamesController.update({
        id,
        title,
        description,
        categoryId,
        plataformId,
        imageUrl,
        endDate,
        status,
      });
      res.status(200).json(game);
      return;
    } catch (error) {
      console.log('error', error);
      if (error instanceof GameNotFoundError) {
        res.status(404).json({ message: 'Game not found.' });
        return;
      }
      if (error instanceof InvalidStatusGameError) {
        res.status(400).json({ message: 'Invalid status game.' });
        return;
      }
      if (error instanceof EndDateGameRequiredError) {
        res.status(400).json({
          message: 'End date is required when status is DONE or ABANDONED',
        });
        return;
      }
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

gamesRoutes.delete(
  '/:id',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
      }
      await gamesController.delete(id);
      res.status(200).json({ message: 'Game deleted.' });
      return;
    } catch (error) {
      if (error instanceof GameNotFoundError) {
        res.status(404).json({ message: 'Game not found.' });
        return;
      }
      console.log('error', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

gamesRoutes.get(
  '/',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { search } = req.query;

      const games = await gamesController.list(search as string);
      res.status(200).json(games);
      return;
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

export { gamesRoutes };
