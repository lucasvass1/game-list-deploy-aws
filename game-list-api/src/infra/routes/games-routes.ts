import { Request, Response, Router } from 'express';
import { GamesController } from '../http/controllers/games/games-controller';
import { PrismaGameRepository } from '../database/prisma/repositories/prisma-games-repository';
import { ensureAuthenticated } from '../http/middlewares/ensure-authenticated';
import { InvalidStatusGameError } from '@/domain/errors/invalid-status-game';
import { EndDateGameRequiredError } from '@/domain/errors/end-date-game-required';
import { GameNotFoundError } from '@/domain/errors/game-not-found';
import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';
import { GameAlreadyExistsError } from '@/domain/errors/game-already-exists-error';

const gamesRoutes = Router();
const gamesController = new GamesController(new PrismaGameRepository());

gamesRoutes.post(
  '/',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'Bad request.' });
        return;
      }
      const { id } = req.user;
      const {
        title,
        description,
        categoryId,
        plataformId,
        imageUrl,
        endDate,
        status,
        isFavorite,
      } = req.body;

      if (!title || !status || !categoryId) {
        res.status(400).json({ message: 'Bad request.' });
        return;
      }

      const game = await gamesController.create(id, {
        title,
        description,
        categoryId,
        plataformId,
        imageUrl,
        endDate,
        status,
        isFavorite,
      });
      res.status(201).json(game);
      return;
    } catch (error) {
      console.log('error', error);
      if (error instanceof GameAlreadyExistsError) {
        res.status(409).json({ message: 'Game already exists.' });
        return;
      }
      if (error instanceof CategoryNotFoundError) {
        res.status(404).json({ message: 'Category not found.' });
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
gamesRoutes.put(
  '/:id',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: 'Bad request.' });
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
        res.status(400).json({ message: 'Bad request.' });
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
gamesRoutes.get(
  '/me',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'Bad request.' });
        return;
      }

      const { id: userId } = req.user;
      const {
        search,
        page = '1',
        limit = '10',
        sortBy = 'createdAt',
        order = 'desc',
        category,
        favorite,
      } = req.query;

      const games = await gamesController.listByUser(
        userId,
        search as string,
        page as string,
        limit as string,
        sortBy as 'title' | 'description' | 'createdAt' | 'updatedAt',
        order as 'asc' | 'desc',
        category as string | undefined,
        favorite === 'true' ? true : undefined,
      );
      res.status(200).json(games);
      return;
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

gamesRoutes.patch(
  '/:gameId/favorite',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(400).json({ message: 'Bad request.' });
        return;
      }
      const { gameId } = req.params;
      const { id: userId } = req.user;
      await gamesController.toggleFavorite(gameId, userId);
      res.status(200).json({ message: 'Game favorite updated.' });
      return;
    } catch (error) {
      console.log('error', error);
      if (error instanceof GameNotFoundError) {
        res.status(404).json({ message: 'Game not found.' });
        return;
      }
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

gamesRoutes.get('/favorite', ensureAuthenticated, async (req, res) => {
  try {
    if (!req.user) {
      res.status(400).json({ message: 'Bad request.' });
      return;
    }
    const { id: userId } = req.user;
    const games = await gamesController.listFavoriteGamesController(userId);
    res.status(200).json(games);
    return;
  } catch (error) {
    console.log('error', error);
    res.status(500).json({ message: 'Internal server error.' });
    return;
  }
});

export { gamesRoutes };
