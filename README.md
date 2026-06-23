# Template App

A barebones Rails + Vue + TypeScript template. Fork this repo to start a new app.

## Stack

| Layer | Technology |
|-------|-----------|
| Ruby | 4.0.5 |
| Rails | 8.1.3 |
| Database | PostgreSQL 16 |
| Asset pipeline | Propshaft |
| Frontend bundler | Vite 8 (via vite_rails) |
| Frontend framework | Vue 3.5 |
| Router | vue-router 5 |
| Language | TypeScript 6 |
| Ruby tests | RSpec 7 + SimpleCov |
| JS tests | Vitest 4 + @vitest/coverage-v8 |
| Test factories | FactoryBot + Faker |
| Matchers | Shoulda Matchers 6 |

## Prerequisites

- Ruby 4.0.5 (managed via rbenv)
- Node 22
- PostgreSQL 16

## Setup

```bash
# Install dependencies
bundle install
npm install

# Configure database (copy and edit as needed)
# Default expects PostgreSQL on localhost with no auth — set env vars to override
export DB_HOST=localhost
export DB_PORT=5432
export DB_USERNAME=
export DB_PASSWORD=

# Create databases and run migrations
bin/rails db:create db:migrate

# Start the dev server (Rails + Vite together)
bin/dev
```

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USERNAME` | _(blank)_ | PostgreSQL user |
| `DB_PASSWORD` | _(blank)_ | PostgreSQL password |
| `DB_NAME` | `template_app_development` | Development database name |
| `DB_NAME_TEST` | `template_app_test` | Test database name |

## Running tests

```bash
# Ruby (RSpec) — unset DATABASE_URL if your shell has one set from another project
env -u DATABASE_URL bundle exec rspec

# JavaScript (Vitest)
npm run test

# JavaScript with coverage report
npm run test:coverage

# TypeScript type check only
npm run type-check
```

Coverage reports are written to:
- `coverage/` — SimpleCov HTML + LCOV (Ruby)
- `coverage/frontend/` — v8 HTML + LCOV (JS)

Both are gitignored.

## Frontend structure

```
app/frontend/
├── entrypoints/
│   └── application.ts   # Vite entry point — mounts the Vue app
├── App.vue              # Root component
├── router/
│   └── index.ts         # vue-router config
├── views/               # Route-level components
├── components/          # Shared components
├── composables/         # Vue composables (useX)
├── stores/              # State stores
├── types/               # Shared TypeScript types
└── __tests__/           # Vitest specs mirror the directory above
```

The `@` alias resolves to `app/frontend/` in both Vite and TypeScript.

## Routing

Rails serves the Vue SPA shell for all non-API routes via `PagesController#spa`.

- Vue router handles `/` and all frontend paths
- Rails API lives under `/api/v1/` (namespace is wired in `config/routes.rb`)
- `/up` is the Rails health check endpoint

## Forking for a new app

1. Fork or copy the repo
2. Rename the app — search and replace `template_app` in:
   - `config/database.yml`
   - `config/deploy.yml`
   - `config/application.rb` (module name)
3. Set your database env vars
4. Run `bin/rails db:create db:migrate`
5. Update `config/deploy.yml` with your server details if deploying with Kamal

## CI

GitHub Actions runs four jobs on every PR and push to `master`:

| Job | What it checks |
|-----|---------------|
| `scan_ruby` | Brakeman + bundler-audit security scans |
| `lint` | RuboCop |
| `test_ruby` | RSpec with SimpleCov coverage |
| `test_frontend` | vue-tsc type check + Vitest with v8 coverage |
