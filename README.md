# Storefront API

## How to start the project

1. Clone the repository
2. Install the dependencies with `npm install`
3. Rename the `.env.example` file to `.env` and fill the variables or use the default ones
4. 'you must have docker installed' Run `docker-compose up -d` to start the database
5. Run `docker exec -it <postgres_container_id> psql -U postgres` to connect to the database
6. Run `CREATE DATABASE store; CREATE DATABASE store_test;` to create the database and the test database
7. Run `npm run migrate:up` to run the migrations
8. Run the project with `npm start`

### Available Scripts

```bash
npm start
npm run watch
npm run reset:test-db
npm run jasmine
npm run test
npm run tsc
npm run build
npm run migrate:up
npm run migrate:down
npm run lint
npm run prettier
```

1. `npm start`: Run the project in production mode
2. `npm run watch`: Run the project in development mode
3. `npm run reset:test-db`: Reset the test database
4. `npm run test`: Run the tests
5. `npm run build`: Build the project
6. `npm run migrate:up`: Run the migrations
7. `npm run lint`: Run the linter
8. `npm run prettier`: Run prettier

## Endpoints

All the endpoints are documented in the REQUIREMENTS.md file

## Database Schema

All the database schema is documented in the REQUIREMENTS.md file

## Technologies

- [NodeJS](https://nodejs.org/en/) - The JavaScript runtime.
- [Express](https://expressjs.com/) - The web framework.
- [TypeScript](https://www.typescriptlang.org/) - The language used.
- [PostgreSQL](https://www.postgresql.org/) - The database.
- [pg](https://node-postgres.com/) - The PostgreSQL client for Node.js.
- [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool.
- [Docker](https://www.docker.com/) - The containerization platform.
- [eslint](https://eslint.org/) - The linter.
- [prettier](https://prettier.io/) - The code formatter.
- [jasmine](https://jasmine.github.io/) - The testing framework.
