import { FastifyInstance } from 'fastify';

import { db } from '../database/connection.js';
import { causes, userCauses } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export async function causeController(fastify: FastifyInstance) {
  fastify.get('/', async (request, reply) => {
    const causesWithOwners = await db
      .select()
      .from(userCauses)
      .leftJoin(causes, eq(causes.uuid, userCauses.causeId));
    reply.code(200).send(causesWithOwners);
  });

  fastify.post('/', { preHandler: fastify.authenticate }, async (request, reply) => {
    console.log(request.user);
    throw new Error('Not implemented');
  });
}
