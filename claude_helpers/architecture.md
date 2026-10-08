# Architecture

## 1. Stack

### Frontend

- React
- TypeScript
- TSX
- React Router
- Axios or a centralized fetch client
- React Hook Form where useful
- Zod or equivalent validation where useful
- Lucide React
- Jest + React Testing Library

### Backend

- Node.js
- Express
- TypeScript
- Mongoose
- MongoDB
- JWT
- bcrypt
- Zod or equivalent validation
- Jest + Supertest

### Build/Quality

- TypeScript
- ESLint
- Prettier
- Jest

## 2. System Shape

```text
Browser
  |
  | HTTPS REST API
  v
React Frontend
  |
  | HTTP
  v
Express API
  |
  +--> Auth Middleware
  |
  +--> Module Routers
          |
          v
       Services
          |
          v
       Mongoose
          |
          v
       MongoDB
```

## 3. Frontend Architecture

Use a layered React application:

```text
Router
  |
  +-- PublicLayout
  |     |
  |     +-- LoginPage
  |
  +-- ProtectedLayout
        |
        +-- DashboardPage
        +-- EmployeesPage
        +-- TasksPage
```

Recommended frontend responsibilities:

- `pages/`: route-level composition.
- `layouts/`: application shells.
- `components/`: reusable UI.
- `features/`: feature-specific UI and hooks.
- `services/`: API clients.
- `hooks/`: reusable React behavior.
- `types/`: frontend domain types.
- `utils/`: stateless helpers.

## 4. Backend Architecture

Use feature modules.

Each module owns its domain behavior.

Example:

```text
modules/
├── auth/
├── employees/
└── tasks/
```

A module may contain:

```text
routes.ts
controller.ts
service.ts
model.ts
validation.ts
types.ts
```

Only create files that are actually needed.

## 5. Backend Request Flow

```text
HTTP Request
  -> Router
  -> Authentication Middleware
  -> Validation
  -> Controller
  -> Service
  -> Mongoose Model
  -> MongoDB
  -> Service
  -> Controller
  -> JSON Response
```

Controllers should remain thin.

Services contain business rules.

Models define persistence structure.

## 6. Authentication

JWT-based authentication.

Flow:

```text
POST /api/auth/login
        |
        v
Validate credentials
        |
        v
Compare password hash
        |
        v
Create JWT
        |
        v
Return authentication result
```

Protected requests include the JWT using the chosen authentication mechanism.

Authentication middleware validates the token before protected routes execute.

## 7. Database

MongoDB collections:

```text
admins
employees
tasks
```

### Admin

Fields:

- `_id`
- `email`
- `passwordHash`
- `createdAt`
- `updatedAt`

### Employee

Fields:

- `_id`
- `name`
- `email`
- `position`
- `createdAt`
- `updatedAt`

### Task

Fields:

- `_id`
- `title`
- `description`
- `employeeId`
- `priority`
- `dueDate`
- `status`
- `createdAt`
- `updatedAt`

Task `employeeId` references Employee.

## 8. Indexes

At minimum:

- Admin email: unique.
- Employee email: unique.
- Task employeeId.
- Task status.
- Task dueDate.

Use indexes based on actual query patterns.

## 9. Configuration

External/system configuration belongs in `server/config/`.

Examples:

- database configuration
- JWT configuration
- environment configuration
- CORS configuration

Configuration should be loaded once and exposed through typed configured objects.

## 10. Middleware

Recommended middleware:

- Security headers.
- CORS.
- Rate limiting.
- JSON body parsing.
- Authentication.
- Request validation where needed.
- Not-found handler.
- Central error handler.

## 11. Error Strategy

Use a central application error type.

Example response:

```json
{
  "success": false,
  "message": "Employee email already exists",
  "code": "EMPLOYEE_EMAIL_EXISTS"
}
```

Successful responses should follow a predictable structure.

## 12. Environment

Expected environment variables:

```text
NODE_ENV
PORT
MONGODB_URI
JWT_SECRET
JWT_EXPIRES_IN
CLIENT_URL
ADMIN_EMAIL
ADMIN_PASSWORD
```

Secrets must never be committed.

## 13. Deployment Shape

The system should be deployable as:

- React frontend on a static/Node-compatible frontend host.
- Express backend on a Node-compatible server/container.
- MongoDB Atlas or another MongoDB deployment.

The architecture must not depend on local development paths.
