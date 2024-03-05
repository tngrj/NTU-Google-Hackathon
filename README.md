## Download PostgreSQL

Download PostgreSQL from this [`link`](https://www.postgresql.org/download/).

After downloading, access PostgreSQL through terminal using `psql -U postgres`.

Create a new Database using the command `CREATE DATABASE database_name;`. Replace `database_name` with the name of your database.

To select the newly created database, use the command `\c database_name`.

## Install packages

Install the necessary packages using one of the following commands:

```bash
npm install
# or if you are using pnpm
pnpm install
```

## Generate Prisma

Once you've created a project and installed dependencies, generate Prisma client using:

```bash
npx prisma generate
# or with pnpm
pnpm dlx prisma generate
```

## Development

To start the development server:

```bash
npm run build --open
# or with pnpm
pnpm run build --open
```

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
