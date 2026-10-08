# Employee Task Management Dashboard — PRD

## 1. Product Overview

Build a functional internal admin dashboard for managing employees and their tasks.

The application is an authenticated admin-only system. An administrator can manage employees, create and assign tasks, update task status, filter tasks, and view a concise operational summary.

This is an internal productivity application, not a public SaaS product. Prioritize correctness, maintainability, clear UX, validation, and clean architecture over unnecessary features.

## 2. Goals

- Provide secure admin login.
- Manage employee records.
- Manage employee tasks.
- Assign each task to an employee.
- Track priority, due date, and status.
- Filter tasks by employee and status.
- Provide dashboard-level counts.
- Persist all application data in MongoDB.
- Expose functionality through REST APIs.
- Keep the UI responsive and professional.

## 3. Non-Goals

Do not implement unless explicitly requested:

- Employee self-registration.
- Employee login.
- Payroll.
- Attendance.
- Chat or messaging.
- Email notifications.
- File uploads.
- Role-based permissions beyond the basic authenticated admin.
- Complex analytics.
- Real-time WebSockets.
- Third-party integrations.

## 4. User

### Admin

The only application user type.

The admin can:

- Log in.
- View dashboard.
- Add employees.
- Edit employees.
- Delete employees.
- View employee list.
- Create tasks.
- Assign tasks.
- Edit tasks.
- Delete tasks.
- Change task status.
- Filter tasks by employee.
- Filter tasks by status.

## 5. Employee Fields

- `id`
- `name`
- `email`
- `position`
- `createdAt`
- `updatedAt`

Email must be unique.

## 6. Task Fields

- `id`
- `title`
- `description`
- `employeeId`
- `priority`
- `dueDate`
- `status`
- `createdAt`
- `updatedAt`

### Priority

Allowed values:

- `low`
- `medium`
- `high`

### Status

Allowed values:

- `pending`
- `in_progress`
- `completed`

## 7. Authentication

Use JWT-based admin authentication.

The admin credentials should come from environment variables or a seeded admin record. Passwords must never be stored in plaintext.

Protected API routes require a valid JWT.

The frontend stores the authentication state using the project's selected secure approach and must redirect unauthenticated users to `/login`.

## 8. Pages

### Login

- Email/username field.
- Password field.
- Login action.
- Validation and API error handling.
- Redirect to dashboard after successful login.

### Dashboard

Show:

- Total employees.
- Total tasks.
- Pending tasks.
- In-progress tasks.
- Completed tasks.

Include a compact task overview with useful status information.

### Employees

Show:

- Employee table/list.
- Search if useful.
- Add employee action.
- Edit employee action.
- Delete employee action.

### Tasks

Show:

- Task list/table.
- Create task action.
- Edit task action.
- Delete task action.
- Status update action.
- Employee filter.
- Status filter.
- Optional priority filter if it improves usability.

Task rows should clearly expose:

- Title.
- Assigned employee.
- Priority.
- Due date.
- Status.

## 9. UX Requirements

- Responsive desktop-first admin interface.
- Mobile layout must remain usable.
- Consistent loading states.
- Empty states.
- Error states.
- Confirmation before destructive deletion.
- Success/error feedback after mutations.
- Form validation before API submission.
- Avoid unnecessary page reloads after mutations.
- Use reusable UI components.
- Avoid oversized tables on mobile; use responsive cards or horizontal scrolling where appropriate.

## 10. Functional Acceptance Criteria

### Authentication

- Invalid credentials are rejected.
- Valid credentials create an authenticated session.
- Protected API routes reject unauthenticated requests.
- Logout clears the client authentication state.

### Employees

- Admin can create an employee.
- Duplicate employee email is rejected.
- Admin can edit an employee.
- Admin can delete an employee.
- Employee list reflects database state.

### Tasks

- Admin can create a task.
- A task must reference an existing employee.
- Admin can edit a task.
- Admin can delete a task.
- Admin can change task status.
- Task status is persisted.
- Tasks can be filtered by employee.
- Tasks can be filtered by status.

### Dashboard

- Employee count is accurate.
- Task counts are accurate.
- Counts update after relevant mutations.

## 11. Validation

Backend validation is authoritative.

Frontend validation should provide fast UX feedback but must not replace backend validation.

Examples:

- Employee name is required.
- Employee email must be valid and unique.
- Task title is required.
- Assigned employee must exist.
- Priority must be an allowed enum.
- Status must be an allowed enum.
- Due date must be a valid date.

## 12. Error Handling

API errors use a consistent JSON shape.

The frontend should display human-readable messages without exposing internal stack traces.

Never expose:

- Password hashes.
- JWT secrets.
- Database credentials.
- Internal stack traces.
- Environment variables.

## 13. Definition of Done

A feature is complete only when:

1. The feature works end-to-end.
2. Frontend and backend are connected through APIs.
3. Database persistence works.
4. Validation exists on both appropriate layers.
5. Error/loading/empty states are handled.
6. Relevant Jest tests are written.
7. Tests have been executed successfully.
8. TypeScript errors are resolved.
9. Dead/temporary/debug code is removed.
10. `memory.md` is updated with the implemented feature and important decisions.
