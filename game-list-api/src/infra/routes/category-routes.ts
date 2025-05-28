import { Request, Response, Router } from 'express';
import { PrismaCategoryRepository } from '@/infra/database/prisma/repositories/prisma-category-repository';
import { CategoryProps } from '@/domain/entities/category';
import { z } from 'zod';
import { CategorysController } from '../http/controllers/category/category-controller';
import { ensureAuthenticated } from '../http/middlewares/ensure-authenticated';
import { CategoryNotFoundError } from '@/domain/errors/category-not-foud';

const categoryRoutes = Router();
const categorysController = new CategorysController(
  new PrismaCategoryRepository(),
);

categoryRoutes.post(
  '/',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      if (!req.body.title) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
      }
      const { title, description } = req.body;
      const category = await categorysController.create({
        title,
        description,
      } as CategoryProps);
      res.status(201).json(category);
      return;
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ errors: error.errors });
        return;
      }
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

categoryRoutes.get(
  '/',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const {
        page = '1',
        limit = '10',
        sortBy = 'createdAt',
        order = 'desc',
      } = req.query;

      const categorys = await categorysController.list({
        page: Number(page),
        limit: Number(limit),
        sortBy: sortBy as 'tilte' | 'description' | 'createdAt' | 'updatedAt',
        order: order as 'asc' | 'desc',
      });
      res.status(200).json(categorys);
      return;
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

categoryRoutes.put(
  '/:id',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
      }

      const { title, description } = req.body;
      const category = await categorysController.update({
        id,
        title,
        description,
      } as CategoryProps);
      res.status(200).json(category);
      return;
    } catch (error) {
      console.log('error', error);
      if (error instanceof CategoryNotFoundError) {
        res.status(404).json({ message: 'Category not found.' });
        return;
      }
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

categoryRoutes.delete(
  '/:id',
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'Missing required fields.' });
        return;
      }
      await categorysController.delete(id);
      res.status(200).json({ message: 'Category deleted.' });
      return;
    } catch (error) {
      console.log('error', error);
      res.status(500).json({ message: 'Internal server error.' });
      return;
    }
  },
);

export { categoryRoutes };
