# RetrenchGoWhere

## _A one stop portal for your job needs_

[![Powered By Sveltekit](https://img.shields.io/badge/powered%20by-svelte-FF3C02.svg?style=flat&logo=svelte)](https://kit.svelte.dev/) [![Language: TypeScript](https://img.shields.io/badge/language-typescript-blue.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/) [![Tailwindcss](https://img.shields.io/badge/Tailwindcss-CSS--Framework-%2338B2AC?logo=tailwindcss)](https://tailwindcss.com) [![Postcss](https://img.shields.io/badge/Postcss-style-%23DD3A0A?style=flat&logo=postcss)](https://postcss.org) [![Prettier](https://img.shields.io/badge/Prettier-code--formatter-%23F7B93E?style=flat&logo=prettier)](https://prettier.io/) [![Eslint](https://img.shields.io/badge/Eslint-linter-%234B32C3?style=flat&logo=eslint)](https://eslint.org/)

## Project Setup

### Download PostgreSQL

Download [`PostgreSQL`](https://www.postgresql.org/download/).

After downloading, access PostgreSQL through terminal using `psql -U postgres`.

Create a new Database using the command `CREATE DATABASE database_name;`. Replace `database_name` with the name of your database.

### Install packages

Install the necessary packages using one of the following commands:

`npm install` or `pnpm install`

### Generate Prisma

Once you've installed all dependencies, generate Prisma client using:

`npx prisma generate` or `pnpm dlx prisma generate`

### Google Cloud SDK Setup

Download the Google Cloud SDK installer for your operating system from the [Google Cloud SDK Documentation](https://cloud.google.com/sdk/docs/install).

Follow the installation guide for your operating system to install the Google Cloud SDK.

After installation, run `gcloud init` to initialize the SDK and follow the prompts to authenticate and select a project.

Run `gcloud auth application-default login` to authenticate yourself and prevent credential issues.

## Environment Variables

The following environment variables are required to run the project:

- `DATABASE_URL`: The URL for your PostgreSQL database.
- `CLIENT_ID` & `CLIENT_SECRET`: Obtained from [`MySkillsFuture API`](https://developer.ssg-wsg.gov.sg)for authentication.
- `PROJECT_ID`: The project ID for the Google Cloud project.
- `LOCATION`: The location for the Google Cloud project.
- `MODEL`: The name of the model to be used for text analysis (e.g., "gemini-1.0-pro-vision-001").

### Development

To start the development server:

`npm run dev --open` or `pnpm run dev --open`

### Building

To create a production version of the app:

`npm run build`

You can preview the production build with `npm run preview`.
