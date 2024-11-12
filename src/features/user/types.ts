import { z } from 'zod';

const User = z.object({
  uuid: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

const Login = z.object({
  email: z.string().min(1, 'Email is required').email(),
  password: z.string().min(1, 'Password is required'),
});

const Roles = z.enum(['admin', 'user']);

type User = typeof User._type;
type Roles = typeof Roles._type;

export { User, Login, Roles };
