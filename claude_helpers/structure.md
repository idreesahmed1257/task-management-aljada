# Project Structure

## 1. Repository

```text
employee-task-dashboard/
├── client/
├── server/
├── package.json
├── README.md
└── .gitignore
```

The frontend is React + TypeScript. The backend is Node.js + Express + TypeScript.

## 2. Backend Structure

Use this structure as the baseline:

```text
server.ts
server/
├── app.ts
├── constants.ts
├── config/
├── middlewares/
├── modules/
│   ├── auth/
│   ├── employees/
│   └── tasks/
├── services/
└── utils/
```

### server.ts

Application entry point.

Responsibilities:

- Load configuration.
- Start the HTTP server.
- Handle graceful shutdown where appropriate.

### server/app.ts

Express application.

Responsibilities:

- Security headers.
- CORS.
- Rate limiting.
- JSON parsing.
- Authentication setup where applicable.
- Router registration.
- Not-found handler.
- Central error handler.

### server/constants.ts

Fixed values only.

Examples:

- task status values
- priority values
- roles
- API constants
- seed configuration

Do not place mutable application state here.

### server/config/

One configured object per external/system configuration.

Example:

```text
config/
├── database.ts
├── env.ts
└── jwt.ts
```

### server/middlewares/

Reusable Express middleware.

Example:

```text
middlewares/
├── auth.ts
├── error.ts
└── validation.ts
```

### server/modules/

One folder per business feature.

```text
modules/
├── auth/
│   ├── controller.ts
│   ├── routes.ts
│   ├── service.ts
│   ├── model.ts
│   ├── validation.ts
│   └── types.ts
├── employees/
│   ├── controller.ts
│   ├── routes.ts
│   ├── service.ts
│   ├── model.ts
│   ├── validation.ts
│   └── types.ts
└── tasks/
    ├── controller.ts
    ├── routes.ts
    ├── service.ts
    ├── model.ts
    ├── validation.ts
    └── types.ts
```

Only add files when the feature needs them.

### server/services/

Shared behavior used by more than one module.

Do not move domain-specific logic here merely to reduce module file size.

### server/utils/

Stateless helpers.

Examples:

- date helpers
- API response helpers
- JWT helper utilities
- error utilities

## 3. Frontend Structure

```text
client/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── router.tsx
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   └── ProtectedLayout.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── EmployeesPage.tsx
│   │   └── TasksPage.tsx
│   ├── components/
│   │   ├── ui/
│   │   ├── navigation/
│   │   ├── feedback/
│   │   └── forms/
│   ├── features/
│   │   ├── auth/
│   │   ├── employees/
│   │   ├── tasks/
│   │   └── dashboard/
│   ├── services/
│   │   ├── api.ts
│   │   ├── authApi.ts
│   │   ├── employeesApi.ts
│   │   └── tasksApi.ts
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   └── styles/
├── public/
└── package.json
```

## 4. Frontend Responsibilities

### `main.tsx`

React bootstrap only.

### `App.tsx`

Application root composition.

### `router.tsx`

Route definitions and protected/public routing.

### `layouts/`

Shared page shells.

`PublicLayout` is for login/public pages.

`ProtectedLayout` contains:

- Sidebar.
- Header.
- User menu.
- Main content area.

### `pages/`

Route-level components.

Pages should compose feature components rather than contain all implementation details.

### `features/`

Feature-specific components, hooks, schemas, and UI behavior.

### `components/ui/`

Generic reusable UI primitives.

Examples:

- Button
- Input
- Select
- Modal
- Badge
- Table
- EmptyState
- Spinner

## 5. TSX Limit

No `.tsx` file may exceed 400 lines.

If a file approaches 400 lines, extract:

- table
- row
- form
- modal
- filter bar
- statistics card
- custom hook
- reusable section

Do not split files arbitrarily; preserve clear ownership.

## 6. Naming

Use:

- PascalCase for React components.
- camelCase for functions/variables.
- PascalCase for TypeScript types/interfaces.
- lowercase feature directory names.
- descriptive names.

Examples:

```text
EmployeeTable.tsx
EmployeeForm.tsx
TaskFilters.tsx
useEmployees.ts
employeeService.ts
```

## 7. Tests

Keep tests close to the code they test where practical.

Examples:

```text
modules/employees/service.test.ts
modules/tasks/service.test.ts
```

Frontend:

```text
features/employees/EmployeeForm.test.tsx
features/tasks/TaskFilters.test.tsx
```

## 8. Forbidden Structure

Do not create:

```text
components/
├── Everything.tsx
└── Helpers.ts
```

Do not create a giant controller/service containing every feature.

Do not put all API calls inside `App.tsx`.

Do not create a generic abstraction before there is a real reuse case.
