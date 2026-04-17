# Buchi Backend (NestJS + PostgreSQL)

Backend API for the Buchi pet adoption app.

## Tech Stack

- NestJS (TypeScript)
- PostgreSQL + TypeORM
- Validation via `class-validator` + `class-transformer`
- File uploads via `multer` (stored in `uploads/`)
- Static file serving via `@nestjs/serve-static` at `/uploads`
- Docker + Docker Compose

## Environment

Create `.env` from `.env.example`:

- `PORT=3000`
- `DATABASE_HOST=localhost`
- `DATABASE_PORT=5432`
- `DATABASE_USER=postgres`
- `DATABASE_PASSWORD=123`
- `DATABASE_NAME=buchi`
- `DOG_API_KEY=<your_thedogapi_key>`

Example:

```env
DOG_API_KEY=your_api_key_here
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=123
DATABASE_NAME=buchi
```

## Run Locally

```bash
npm install
npm run build
npm run start:dev
```

App base URL: `http://localhost:3000`

## Run with Docker

```bash
docker compose down
docker compose build --no-cache --pull
docker compose up
```

App: `http://localhost:3000`

Uploads: `http://localhost:3000/uploads/<filename>`

Docker PostgreSQL is exposed on host port `5433` (`5433:5432`), while the app talks to `postgres:5432` internally.

## Unit Tests

```bash
npm test
```

## Implemented Endpoints

1. `POST /create_pet`
   - Accepts multipart/form-data with `photos`
   - Stores files in `uploads/`
   - Returns:
   ```json
   { "status": "success", "pet_id": "<uuid>" }
   ```

2. `GET /get_pets`
   - Filters: `type`, `gender`, `size`, `age`, `good_with_children`, `limit` (required)
   - Supports multi-select via comma-separated values for `type`, `gender`, `size`, `age`
   - Searches local DB first; fills remaining results from external placeholder service
   - Returns local items first, with `source` field (`local` or `petfinder`)

3. `POST /add_customer`
   - If phone exists, returns existing id
   - Otherwise creates customer
   - Returns:
   ```json
   { "status": "success", "customer_id": "<uuid>" }
   ```

4. `POST /adopt`
   - Validates `customer_id` and `pet_id`
   - Creates adoption record
   - Returns:
   ```json
   { "status": "success", "adoption_id": "<uuid>" }
   ```

5. `GET /get_adoption_requests`
   - Query params: `from_date`, `to_date`
   - Returns flattened customer/pet details ordered oldest first

6. `POST /generate_report` (bonus)
   - Body: `from_date`, `to_date`
   - Returns:
     - `adopted_pet_types`
     - `weekly_adoption_requests` (week-start date to count map)

## Current Request Flow

1. `POST /create_pet` with `multipart/form-data` and one or more `photos` files.
2. `POST /add_customer` to create or fetch existing customer by phone.
3. `POST /adopt` using returned `customer_id` and `pet_id`.
4. `GET /get_pets?limit=...` to confirm local-first merge behavior with external fallback.
5. `GET /get_adoption_requests?from_date=...&to_date=...`.
6. `POST /generate_report` with the same date range for weekly/type aggregates.

Notes:
- `create_pet` must be sent as `form-data`, not raw JSON.
- `get_pets` supports multi-select filters as comma-separated query values.
- The external fallback uses TheDogAPI when local results are below `limit`.

## Assessment Delivery Checklist

1. Push this project to your public GitHub repository.
2. Create a Postman workspace/collection with all endpoints and example requests.
3. Share:
   - GitHub repository URL
   - Postman workspace/collection URL
