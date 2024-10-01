import { randomUUID } from "node:crypto";

import { FastifyInstance } from "fastify";
import bcrypt from 'bcrypt';

import { db } from "../database/connection.js";
import { users } from "../database/schema.js";
import { User } from "./types.js";

export async function userController(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    const validData = User.safeParse(request.body);

    if (!validData.success) {
      return reply.code(400).send({ error: validData.error });
    }

    const { name, email, password } = validData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const uuid = randomUUID()

    try {
      const newUser = await db.insert(users).values({ uuid, name, email, password: hashedPassword }).returning();
      reply.code(201).send(newUser[0]);
    } catch (error) {
      reply.code(500).send({ error: 'Error creating user' });
    }
  });
}
