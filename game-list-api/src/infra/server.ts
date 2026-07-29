import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerConfig } from './http/docs/swagger';

dotenv.config();

const app = express();

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin =>
      stripTrailingSlash(origin.trim()),
    )
  : null;

app.use(
  cors({
    origin: allowedOrigins
      ? (origin, callback) => {
          if (!origin || allowedOrigins.includes(stripTrailingSlash(origin))) {
            callback(null, true);
            return;
          }
          callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
      : true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

export { app };
