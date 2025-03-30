
# Pokémon API Server Project

A RESTful Pokémon API built with TypeScript, Express, and TypeORM, designed to manage Pokémon data efficiently.

## Features

- CRUD operations for Pokémon entries.
- SQLite database integration via TypeORM.
- Data validation with class-validator.
- Structured, maintainable codebase following TypeScript best practices.
- Middleware for authentication and request handling.

## Tech Stack

- **Backend:** TypeScript, Express
- **Database:** SQLite (via TypeORM)

## Prerequisites

Ensure the following are installed on your machine:

- Node.js (v16 or higher recommended)
- npm (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/ViSadhu/PokemonAPIServer_Project.git
cd PokemonAPIServer_Project
npm install
```

## Configuration

Database settings can be adjusted in the `src/data-source.ts` file:

```typescript
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Pokemon, User, Type],
});
```

## Running the Application

To start the server:

```bash
npm start
```

The API server will run locally at `http://localhost:3001`.

## API Endpoints

### Auth Endpoints
| Method | Endpoint        | Description                |
|--------|-----------------|----------------------------|
| POST   | `/login`        | Authenticate user          |
| POST   | `/register`     | Register new user          |

### Pokémon Endpoints
| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| GET    | `/pokemon`      | Retrieve all Pokémon           |
| GET    | `/pokemon/:id`  | Retrieve a Pokémon by ID       |
| POST   | `/pokemon`      | Add a new Pokémon              |
| PUT    | `/pokemon/:id`  | Update existing Pokémon by ID  |
| DELETE | `/pokemon/:id`  | Delete a Pokémon by ID         |

### Type Endpoints
| Method | Endpoint        | Description                    |
|--------|-----------------|--------------------------------|
| GET    | `/types`        | Retrieve all Pokémon types     |
| GET    | `/types/:id`    | Retrieve a Pokémon type by ID  |
| POST   | `/types`        | Add a new Pokémon type         |
| PUT    | `/types/:id`    | Update Pokémon type by ID      |
| DELETE | `/types/:id`    | Delete a Pokémon type by ID    |

### Request Example

Adding a Pokémon:

```json
{
  "name": "Pikachu",
  "type": "Electric",
  "generation": 1,
  "description": "A yellow electric mouse Pokémon."
}
```

## Project Structure

```
src/
├── controller/
│   ├── AuthController.ts
│   ├── PokemonController.ts
│   └── TypeController.ts
├── decorator/
│   ├── Controller.ts
│   ├── Route.ts
│   └── RouteDefinition.ts
├── entity/
│   ├── Pokemon.ts
│   ├── Type.ts
│   └── User.ts
├── middleware/
│   └── auth.ts
├── data-source.ts
└── index.ts

Root files:
├── .gitignore
├── database.sqlite
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## Contributing

Contributions are welcomed! Fork this repo, commit your changes, and open a Pull Request.

## License

This project is licensed under the MIT License.
