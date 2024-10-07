import { randomUUID } from 'node:crypto';

import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';

import { db } from '../database/connection.js';
import { users } from '../database/schema.js';
import { Login, User } from './types.js';
import { eq } from 'drizzle-orm';

export async function userController(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const validData = User.safeParse(request.body);

    if (!validData.success) {
      return reply.code(400).send({ error: validData.error });
    }

    const { name, email, password } = validData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = randomUUID();

    try {
      const newUser = await db
        .insert(users)
        .values({ uuid, name, email, password: hashedPassword })
        .returning();
      reply.code(201).send(newUser[0]);
    } catch (error) {
      reply.code(500).send({ error: 'Error creating user' });
    }
  });

  fastify.post('/login', async (request, reply) => {
    const validData = Login.safeParse(request.body);

    if (!validData.success) {
      return reply.code(400).send({ error: validData.error });
    }

    const { email, password } = validData.data;

    try {
      const user = await db.select().from(users).where(eq(users.email, email));

      if (!user[0]) {
        return reply.code(401).send({ error: 'Invalid email or password' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

      if (!isPasswordCorrect) {
        return reply.code(401).send({ error: 'Invalid email or password' });
      }

      const token = fastify.jwt.sign({
        uuid: user[0].uuid,
        name: user[0].name,
        email: user[0].email,
      });

      reply
        .code(200)
        .send({ token, user: { uuid: user[0].uuid, name: user[0].name, email: user[0].email } });
    } catch (error) {
      reply.code(500).send({ error: 'Error logging in user' });
      fastify.log.error(error);
    }
  });

  fastify.get('/me', async (request, reply) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return reply.code(401).send({ error: 'No token provided' });
    }

    try {
      const user = fastify.jwt.verify(token);
      reply.code(200).send({ user });
    } catch (error) {
      reply.code(401).send({ error: 'Invalid token' });
    }
  });
}
