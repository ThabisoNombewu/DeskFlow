# DeskFlow Backend

DeskFlow Backend is a secure REST API for an internal IT service request portal. It provides authentication, role-based access control, ticket creation, ticket listing, and ticket status management.

## Key Features

- JWT-based authentication
- Role-based authorization for `Employee` and `Admin`
- Ticket creation and prioritized workflow
- Employee access to own tickets, Admin access to all tickets
- Swagger documentation available via `/api-docs`
- MongoDB persistence with Mongoose models

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- bcrypt password hashing (`bcryptjs`)
- Swagger documentation (`swagger-jsdoc`, `swagger-ui-express`)
- Request validation and centralized error handling

## Project Structure

- `server.js` — application entrypoint
- `config/db.js` — MongoDB connection logic
- `config/seed.js` — seeds demo users and sample tickets
- `controllers/` — request handlers for auth and tickets
- `middleware/` — auth, role enforcement, and error handling
- `models/` — Mongoose schemas for `User` and `Ticket`
- `routes/` — Express route definitions
- `docs/swagger.js` — OpenAPI documentation setup

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from your environment template and configure the required values:

```bash
copy .env.example .env
```

3. Set environment variables in `.env`:

- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — secret used to sign tokens
- `JWT_EXPIRES_IN` — optional token expiration (default `8h`)
- `PORT` — optional port (default `5000`)
- `CLIENT_ORIGIN` — optional CORS origin

4. Seed demo data:

```bash
npm run seed
```

5. Start the API server:

```bash
npm run dev
```

Server will run on `http://localhost:5000` by default.

## API Documentation

Swagger UI is available at:

```text
http://localhost:5000/api-docs
```

## Authentication

### Login

- `POST /api/auth/login`
- Request body:
  - `username` (string)
  - `password` (string)
- Response includes a JWT token to be used in the `Authorization` header:

```http
Authorization: Bearer <token>
```

## Ticket Endpoints

### Create Ticket

- `POST /api/tickets`
- Requires authenticated `Employee`
- Request body:
  - `title` (string)
  - `description` (string)
  - `priority` (`Low`, `Medium`, `High`)

### List Tickets

- `GET /api/tickets`
- Requires authenticated `Employee` or `Admin`
- Employees receive only their own tickets
- Admins receive all tickets
- Optional query parameters:
  - `status` (`Open`, `In Progress`, `Resolved`)
  - `priority` (`Low`, `Medium`, `High`)

### Update Ticket Status

- `PUT /api/tickets/:id`
- Requires authenticated `Admin`
- Request body:
  - `status` (`Open`, `In Progress`, `Resolved`)

## Seed Data & Demo Users

The `npm run seed` command clears existing data and creates demo credentials.

- Employee:
  - `username`: `t.nombewu@uvu.africa`
  - `password`: `employee123`
- Admin:
  - `username`: `a.mukwevho@uvu.africa`
  - `password`: `admin123`

## Environment Variables

Required:

- `MONGO_URI`
- `JWT_SECRET`

Optional:

- `JWT_EXPIRES_IN` (default: `8h`)
- `PORT` (default: `5000`)
- `CLIENT_ORIGIN` (default: `*`)

## Notes

- Passwords are stored hashed in the database.
- Error responses follow a consistent JSON shape with `success`, `message`, and optional `errors`.
- The API is designed for a simple internal IT service ticket workflow.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
