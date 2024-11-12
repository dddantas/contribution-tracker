import { join } from 'node:path';

import Fastify from 'fastify';
import cors, { FastifyCorsOptions } from '@fastify/cors';
import jwt, { FastifyJWTOptions } from '@fastify/jwt';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { configDotenv } from 'dotenv';

import { userController } from './features/user/controller.js';
import { causeController } from './features/cause/controller.js';
import { createAuthMiddleware } from './features/user/authentication.js';

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  configDotenv({
    path: join(process.cwd(), '.env'),
  });
}

const fastify = Fastify({
  logger: true,
});

// TODO: Setup production url
const corsOptions: FastifyCorsOptions = {
  origin: isDevelopment ? true : 'production url',
};

fastify.register(cors, corsOptions);

const jwtOptions: FastifyJWTOptions = {
  secret: process.env.JWT_SECRET || 'secret',
  sign: {
    expiresIn: '1d',
  },
};

fastify.register(jwt, jwtOptions);
fastify.decorate('authenticate', createAuthMiddleware(fastify));

fastify.register(swagger);
fastify.register(swaggerUi, {
  routePrefix: '/docs',
});

fastify.register(userController, { prefix: '/api/users' });
fastify.register(causeController, { prefix: '/api/causes' });

await fastify.listen({ port: 3000 }).catch((err) => {
  fastify.log.error(err);
});
