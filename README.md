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

All table definitions are stored in the schema.ts file. After making any changes to that file you can generate migrations using drizzle:
```bash
pnpm db:push
```

A web app to manage the database can be accessed by running the following command:
```bash
pnpm db:studio
```

If you would like to reset the database simple delete the local.db file in the root directory and run the following command:
```bash
pnpm db:push
```

## Added Dependencies (in addition to deps necessary for sveltekit)

### `clsx`, `tailwindcss`, `postcss`, `autoprefixer`
These were added to simplify styling overall. Wverything done with tailwind could have been accomplished with css but tailwind makes it really easy to only send styles that are actually used. clsx is a tiny classnames esque library to handle conditional styling.

### `sveltekit-superforms`
A fantastic library for handling forms quickly and easily using any one of many validation libraries (valibot, zod, superstruct, etc).

### `valibot`
The validation library of choice which provides for validation for a small bundle impact.

### `lucia`
Incredible easy and efficient auth management (currently connected to an sqlite db).

### `better-sqlite3`, `drizzle`
A smaller and more performant version of similar libraries for sqlite. Sqlite paired with drizzle makes it incredibly accessible and cost efficient to manage a database.

# Production Server

In the root directory there is a [Dockerfile](./Dockerfile) which is setup to run a production server using node. If you prefer to use [Docker Compose](https://docs.docker.com/compose/) a [docker-compose.yml](./docker-compose.yml) exists in the root directory.

Run the production server using docker compose:

```bash
docker compose up -d
```

There are known issues with the production server not being able to sign in so for tedting please for the time being use the dev server.
