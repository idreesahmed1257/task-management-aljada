# AI Development Rules

## 1. Core Rule

Always follow the project documentation before changing code.

The source of truth is:

1. `prd.md`
2. `architecture.md`
3. `structure.md`
4. `theme.md`
5. `rules.md`
6. `api.md`
7. `memory.md`

If an implementation request conflicts with these documents, identify the conflict before making the change.

## 2. Architecture Rules

- Use React + TypeScript for the frontend.
- Use Node.js + Express + TypeScript for the backend.
- Use MongoDB through Mongoose.
- Use JWT authentication.
- Use REST APIs.
- Keep frontend and backend separated.
- Use feature-based backend modules.
- Use React layouts for authenticated/public application shells.
- Use routers for backend HTTP routing.
- Keep business logic out of Express route handlers.
- Keep database access out of React components.

## 3. TypeScript Rules

- Use `.ts` and `.tsx` only for application TypeScript source.
- Do not introduce JavaScript files for application logic.
- Prefer explicit domain types.
- Avoid `any`.
- Avoid unsafe type assertions unless unavoidable.
- Keep shared enum/value definitions centralized where appropriate.

## 4. React Rules

- Use functional components.
- Use reusable components instead of duplicating UI.
- Keep page components focused on composition.
- Keep API communication in dedicated API/service functions or hooks.
- Do not put raw `fetch` calls throughout UI components.
- Use layouts for authenticated and public sections.
- Handle loading, error, and empty states.
- Do not silently swallow API errors.
- Do not reload the entire browser after CRUD mutations.

## 5. TSX Size Rule

No `.tsx` file may exceed 400 lines.

When a component approaches the limit, split it into smaller components, hooks, forms, table components, or utility modules.

Do not artificially compress code to stay below the limit.

## 6. Backend Rules

Use the following responsibility chain:

`router -> middleware -> controller/handler -> service -> model`

Where appropriate, modules may contain:

- routes
- controller
- service
- model
- validation
- types

Do not create unnecessary abstraction layers for trivial functionality.

## 7. Validation Rules

- Validate all external input.
- Treat backend validation as authoritative.
- Validate ObjectId references before database operations.
- Validate enums.
- Return consistent API errors.
- Never trust client-provided authorization claims.

## 8. Security Rules

- Hash passwords.
- Never log passwords or JWT secrets.
- Never commit `.env` files.
- Use environment variables for secrets.
- Protect private routes with authentication middleware.
- Configure CORS explicitly.
- Add security headers.
- Add reasonable rate limiting.
- Sanitize/validate user input.
- Do not expose internal error stacks in production responses.

## 9. Database Rules

- Use Mongoose models.
- Define appropriate indexes.
- Employee email must be unique.
- Do not create duplicate records accidentally.
- Handle deleted employee/task references explicitly.
- Prefer predictable queries over clever database logic.
- Use timestamps.

## 10. API Rules

- Use RESTful endpoints.
- Use correct HTTP methods.
- Return appropriate status codes.
- Use a consistent response/error format.
- Do not return unnecessary database fields.
- Never expose password hashes.

## 11. Testing Rules

Every feature must include relevant Jest tests.

At minimum, test:

- Authentication success/failure.
- Employee CRUD behavior.
- Task CRUD behavior.
- Task assignment validation.
- Status changes.
- Filtering.
- Important validation and authorization failures.

After implementing a feature:

1. Run Jest.
2. Fix failing tests.
3. Run TypeScript/type checking.
4. Fix type errors.
5. Verify the feature manually when practical.

Never claim a test passed without actually running it.

## 12. Cleanup Rule

After completing every feature:

- Remove debug logs.
- Remove unused imports.
- Remove unused variables.
- Remove temporary files.
- Remove commented-out implementation code.
- Remove abandoned approaches.
- Remove duplicate components.
- Remove dead API endpoints.
- Remove generated garbage code.
- Run formatter/linter if configured.
- Run tests.

The final code should look intentionally authored, not like an accumulated AI patch history.

## 13. Memory Rule

Every completed feature must update `memory.md`.

The update should record:

- What was implemented.
- Important architectural decisions.
- New routes/endpoints.
- New models or fields.
- Important constraints.
- Testing completed.
- Any known limitation that remains.

Do not put transient reasoning or unnecessary implementation narration into `memory.md`.

## 14. Change Discipline

Before changing code:

1. Inspect the relevant existing files.
2. Understand current architecture.
3. Reuse existing patterns.
4. Make the smallest coherent change.
5. Avoid unrelated refactors.

Do not rewrite working code simply because a different approach is preferred.

## 15. Completion Checklist

A task is complete only after:

- Requirements implemented.
- API connected.
- Database persistence verified.
- Validation implemented.
- Error/loading/empty states handled.
- Jest tests written.
- Jest tests run.
- TypeScript checks run.
- Unused/dead code removed.
- UI checked for responsive behavior.
- `memory.md` updated.
