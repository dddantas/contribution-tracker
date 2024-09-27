import Fastify, { FastifyInstance } from "fastify";

const fastify: FastifyInstance = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  return { pong: "it worked!" };
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit();
}
