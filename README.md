
## Pre-requisites

- [Node.js](https://nodejs.org/en/download/) (v20.x.x)
- [Docker](https://docs.docker.com/get-docker/) and Docker Compose (or just PostgreSQL)
- [pnpm](https://pnpm.io/installation)

## Setup

- Copy environment variables from `.env.example`

```sh
cp .env.example .env
```

- Run `npm run db:generate` to generate the database schema

```sh
pnpm run db:generate
```

- Run `npm run db:migrate` to run the migrations

```sh
pnpm run db:migrate
```

