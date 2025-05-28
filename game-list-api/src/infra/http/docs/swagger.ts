import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Game List API',
      version: '1.0.0',
      description: 'API Documentation for Game List Project',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: {
      bearerAuth: [],
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
  },
  apis: ['./src/infra/http/docs/**/*.ts'],
};

export const swaggerConfig = swaggerJSDoc(options);
