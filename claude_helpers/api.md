# API Contract

Base URL:

```text
/api
```

All protected endpoints require valid JWT authentication.

## 1. Standard Response

Success:

```json
{
  "success": true,
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Human-readable error",
  "code": "ERROR_CODE"
}
```

## 2. Authentication

### POST `/api/auth/login`

Authenticate admin.

Request:

```json
{
  "email": "admin@example.com",
  "password": "password"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "token": "jwt-token"
  }
}
```

### GET `/api/auth/me`

Return the authenticated admin identity.

## 3. Employees

### GET `/api/employees`

List employees.

Optional query:

```text
?search=john
```

### GET `/api/employees/:id`

Get one employee.

### POST `/api/employees`

Create employee.

Request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "position": "Software Engineer"
}
```

### PATCH `/api/employees/:id`

Update employee.

### DELETE `/api/employees/:id`

Delete employee.

If tasks reference the employee, use an explicit documented behavior. The preferred behavior is to prevent deletion while assigned tasks exist unless those tasks are reassigned/deleted first.

## 4. Tasks

### GET `/api/tasks`

List tasks.

Supported filters:

```text
?employeeId=<id>
?status=pending
?priority=high
```

Filters may be combined.

### GET `/api/tasks/:id`

Get one task.

### POST `/api/tasks`

Create task.

Request:

```json
{
  "title": "Prepare weekly report",
  "description": "Prepare and submit the weekly operations report.",
  "employeeId": "employee-id",
  "priority": "high",
  "dueDate": "2026-10-15",
  "status": "pending"
}
```

### PATCH `/api/tasks/:id`

Update task.

### PATCH `/api/tasks/:id/status`

Change only task status.

Request:

```json
{
  "status": "completed"
}
```

### DELETE `/api/tasks/:id`

Delete task.

## 5. Dashboard

### GET `/api/dashboard/summary`

Return summary counts.

Example:

```json
{
  "success": true,
  "data": {
    "totalEmployees": 12,
    "totalTasks": 42,
    "pendingTasks": 18,
    "inProgressTasks": 14,
    "completedTasks": 10
  }
}
```

## 6. HTTP Status Codes

Use:

- `200` successful reads/updates.
- `201` successful creation.
- `204` successful deletion when no body is required.
- `400` malformed/invalid request.
- `401` missing or invalid authentication.
- `403` authenticated but not permitted.
- `404` resource not found.
- `409` uniqueness/conflict errors.
- `422` semantically invalid input when appropriate.
- `429` rate limit exceeded.
- `500` unexpected server error.

## 7. Query and Pagination

The initial task is simple, so pagination is optional unless the implementation needs it.

If pagination is introduced, use a predictable contract:

```text
?page=1&limit=20
```

and return metadata:

```json
{
  "page": 1,
  "limit": 20,
  "total": 100,
  "totalPages": 5
}
```

Do not add pagination complexity unless it provides real value for the current scope.

## 8. API Rules

- Validate request bodies.
- Validate route IDs.
- Validate enum values.
- Verify employee existence before task assignment.
- Never return password hashes.
- Never trust an employee ID without checking it exists.
- Keep controllers thin.
- Keep business rules in services.
- Keep response shapes consistent.
