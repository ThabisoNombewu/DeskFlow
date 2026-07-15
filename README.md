# DeskFlow Frontend

DeskFlow is a React-based helpdesk ticketing frontend built with Vite. It provides login-based access for employees and admins, allowing employees to submit support requests and admins to review, filter, and update ticket statuses.

## Key Features

- React + Vite modern frontend stack
- Role-based login flow for Employees and Admins
- Employee dashboard for creating and viewing personal tickets
- Admin dashboard for reviewing all tickets, filtering by status, and updating ticket progress
- Token-based authentication with API request interception
- Demo credentials built into the login page

## Project Structure

- `src/`
  - `App.jsx` - Application routes and guarded role-based navigation
  - `main.jsx` - React app entrypoint
  - `context/AuthContext.jsx` - Authentication state and helpers
  - `api/` - Axios client and API methods for auth/tickets
  - `components/` - Shared UI components like `Navbar`, `TicketForm`, and `TicketList`
  - `pages/` - Route pages for login, employee dashboard, and admin dashboard
- `index.html` - App shell for Vite
- `package.json` - Project metadata, dependencies, and scripts
- `vite.config.js` - Vite configuration
- `.env.example` - Example environment configuration

## Demo Credentials

These credentials are available in the login page presets.

- Employee
  - Username: `'t.nombewu@uvu.africa'`
  - Password: `employee123`
- Admin
  - Username: `a.mukwevho@uvu.africa`
  - Password: `admin123`

## Getting Started

### Requirements

- Node.js 18+ (or compatible version)
- npm or yarn

### Install dependencies

```bash
npm install
```

### Configure API Base URL

By default, the frontend sends requests to `http://localhost:5000/api`.

To override it, create a `.env` file in the project root and set:

```bash
VITE_API_BASE_URL=http://your-api-host/api
```

### Development

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Authentication

- The app stores the user token in `localStorage` under `deskflow_token`.
- User profile details are saved in `deskflow_user`.
- Requests automatically include the auth token using an Axios request interceptor.

## Notes

- The frontend assumes an API with endpoints for authentication and ticket management:
  - `POST /auth/login`
  - `GET /tickets`
  - `POST /tickets`
  - `PUT /tickets/:id`
- Protected routes redirect unauthenticated users to `/login`.
- Administrators can filter ticket status and change request states.

## License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

© 2026 Thabiso Nombewu. All rights reserved.
