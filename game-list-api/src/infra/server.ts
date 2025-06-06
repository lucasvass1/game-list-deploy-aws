import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './http/docs/swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export { app };
