import { Router } from 'express';
import { userRoutes } from './user-routes';
import { categoryRoutes } from './category-routes';
import { plataformRoutes } from './plataform-routes';
import { gamesRoutes } from './games-routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/category', categoryRoutes);
routes.use('/plataform', plataformRoutes);
routes.use('/games', gamesRoutes);

export { routes };
