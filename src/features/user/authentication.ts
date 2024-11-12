import { FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { Roles, User } from './types.js';
import { error } from 'node:console';

export type AuthenticatedRequest = FastifyRequest & {
  user?: User;
};

export type AuthOptions = {
  allowedRoles: Roles[];
  allowAnonymous: boolean;
};

export function createAuthMiddleware(fastify: FastifyInstance) {
  return function authenticate(
    request: AuthenticatedRequest,
    reply: FastifyReply,
    options: AuthOptions = {},
    done: HookHandlerDoneFunction,
  ) {
    const authHeader = request.headers.authorization?.split(' ');

    if (options.allowAnonymous && !authHeader) {
      done();
      return;
    }

    if (!authHeader) {
      reply.code(401).send({
        error: 'Unauthorized',
        message: 'No token provided',
      });
      return;
    }

    const [scheme, token] = authHeader;

    if (scheme !== 'Bearer' || !token) {
      reply.code(401).send({
        error: 'Invalid authentication format',
        message: 'Authorization header must be in the format: Bearer <token>',
      });
      return;
    }

    try {
      const decoded = fastify.jwt.verify(token);
      reply.code(200).send({ decoded });
    } catch (err) {
      console.error(err);
      reply.code(401).send({ error: 'Invalid token' });
    }
  };
}
