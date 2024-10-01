import { z } from 'zod';

const User = z.object({
  uuid: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

type User = typeof User._type;

export { User };
