import { User } from '../features/user/types.js';

export type JwtPayload = User & {
  exp: number;
  iat: number;
};

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: User;
    user: JwtPayload;
  }
}
