import Fastify, { FastifyInstance } from 'fastify';
import { configDotenv } from 'dotenv';
import { join } from 'node:path';

if (process.env.NODE_ENV !== 'production') {
  configDotenv({
    path: join(process.cwd(), '.env'),
  });
}

const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.get('/', async (request, reply) => {
  return { pong: 'it worked!' };
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit();
}
