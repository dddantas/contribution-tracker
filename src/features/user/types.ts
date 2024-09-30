import { z } from 'zod';

const User = z.object({
  uuid: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

type User = typeof User._type;

export { User };
