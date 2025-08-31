# Brainlabs-coding-task-sebastian-kania

# Django (Pydantic) + Postgres + Next.js (TypeScript + TanStack) + Docker

## Quick start

1. Ensure you have Docker + Docker Compose installed.
2. Make sure that the following ports are free: 3000, 8000 and 5432.
3. Clone this project, then in the project root run:
   ```bash
   docker compose up --build
   ```
4. Frontend: http://localhost:3000
5. Backend: http://localhost:8000 (try http://localhost:8000/api/ping)
6. Postgres: localhost:5432
7. Backend testing (inside docker backend Exec):
   ```bash
   pytest -q
   ```

## Notes

env variables should already be included in the project root.
