# suite-portal

## Getting started

Install dependencies using `pnpm`:

```bash
pnpm i
```

You can run a development server using the dev script:

```bash
pnpm dev
```

## Auth

Lucia - https://lucia-auth.com/database/

## Database

sqlite

## Added Dependencies (in addition to deps necessary for sveltekit)

- `clsx`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `sveltekit-superforms`
- `valibot`

# Production Server

In the root directory there is a [Dockerfile](./Dockerfile) which is setup to run a production server using node. If you prefer to use [Docker Compose](https://docs.docker.com/compose/) a [docker-compose.yml](./docker-compose.yml) exists in the root directory.

Run the production server using docker compose:

```bash
docker compose up -d
```
