# Django + Postgres + Vue (TypeScript) + Vuetify + Docker (dev)

## Quick start

1. Ensure you have Docker + Docker Compose installed.
2. Clone or unzip this project, then in the project root run:
   ```bash
   docker compose down -v
   docker compose up --build
   ```
3. Frontend: http://localhost:5173
4. Backend: http://localhost:8000 (try http://localhost:8000/api/ping)
5. Postgres: localhost:5432 (credentials in `.env`).

## Notes

- Development mode: Django runs with `runserver` and hot reload via bind mounts. Vue runs Vite dev server.
- CORS is enabled for the frontend origin(s) from `.env` (`CORS_ALLOWED_ORIGINS`).
- To create a superuser:
  ```bash
  docker compose exec backend bash -lc "python manage.py createsuperuser"
  ```

## Production (outline)

- Replace Django command with Gunicorn (e.g. `gunicorn server.wsgi:application -w 3 -b 0.0.0.0:8000`).
- Build the frontend (`npm run build`) and serve the compiled assets behind a reverse proxy (e.g. Nginx).
- Configure `DEBUG=0`, proper `ALLOWED_HOSTS`, and a persistent Postgres volume/backups.

Happy hacking!

docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate

docker compose restart backend
docker compose exec backend python manage.py createsuperuser

testing backend

pytest -q
