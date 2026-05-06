# Doctore AI — Quant Terminal MVP

Full-stack MVP for **Doctore AI**, a quant terminal style product for sports betting markets.

Core thesis:

> We find the edge. You execute the strategy.

The product is not a tipster product. It is analytical infrastructure for model-market comparison, fractional Kelly stake sizing, bankroll discipline, and protected B2B data/API access.

## Features

### Frontend

- Premium dark quant-terminal UI
- Landing page with product thesis
- Real-time-style edge dashboard with polling
- Fractional Kelly calculator
- Bankroll tracking page
- Pricing page for B2C subscriptions and B2B API
- API documentation page

### Backend

- Next.js App Router API routes
- Edge-runtime pure calculation endpoints
- Prisma + PostgreSQL database
- Positive EV calculation
- Fractional Kelly stake sizing
- Signal ingestion and ranking
- Bet logging
- Bankroll tracking
- B2B API key protection using SHA-256 hashing
- In-memory rate limiting for protected API routes

## Tech stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Zod validation
- Vercel-compatible API routes

## Quick start

```bash
cp .env.example .env
npm install
docker compose up -d
npm run db:push
npm run db:seed
npm run dev
```

Open:

```text
http://localhost:3000
```

## Seeded demo

The seed creates:

- Demo user: `demo@doctore.ai`
- Demo bankroll: €10,000
- Demo B2B API key: `doctore_demo_key_change_me`, unless `B2B_API_KEY` is changed in `.env`
- Demo markets and EV signals for MLB, NBA, and NHL

## API routes

### Health

```bash
curl http://localhost:3000/api/health
```

### Kelly calculation

```bash
curl -X POST http://localhost:3000/api/kelly \
  -H "Content-Type: application/json" \
  -d '{
    "bankroll": 10000,
    "oddsDecimal": 2.05,
    "modelProbability": 0.51,
    "kellyFraction": 0.25,
    "maxStakePct": 5
  }'
```

### Single edge calculation

```bash
curl -X POST http://localhost:3000/api/edges \
  -H "Content-Type: application/json" \
  -d '{
    "sport": "MLB",
    "league": "MLB",
    "eventName": "Yankees @ Red Sox",
    "marketType": "MONEYLINE",
    "selection": "Yankees ML",
    "startsAt": "2026-06-01T19:00:00.000Z",
    "book": "Pinnacle",
    "oddsDecimal": 2.05,
    "modelProbability": 0.51,
    "bankroll": 10000,
    "kellyFraction": 0.25,
    "maxStakePct": 5
  }'
```

### List signals

```bash
curl http://localhost:3000/api/signals
```

### Protected odds ingestion

```bash
curl -X POST http://localhost:3000/api/odds/ingest \
  -H "Content-Type: application/json" \
  -H "x-api-key: doctore_demo_key_change_me" \
  -d '{
    "items": [
      {
        "sport": "MLB",
        "league": "MLB",
        "eventName": "Dodgers @ Padres",
        "marketType": "MONEYLINE",
        "selection": "Dodgers ML",
        "startsAt": "2026-06-01T21:00:00.000Z",
        "book": "Pinnacle",
        "oddsDecimal": 1.98,
        "modelProbability": 0.535,
        "bankroll": 10000,
        "kellyFraction": 0.25,
        "maxStakePct": 5,
        "confidence": 0.69
      }
    ]
  }'
```

### Protected B2B odds export

```bash
curl http://localhost:3000/api/b2b/odds?sport=MLB \
  -H "x-api-key: doctore_demo_key_change_me"
```

### Bankroll

```bash
curl http://localhost:3000/api/bankroll
```

### Log a bet

```bash
curl -X POST http://localhost:3000/api/bets \
  -H "Content-Type: application/json" \
  -d '{
    "selection": "Yankees ML",
    "book": "Pinnacle",
    "oddsTaken": 2.08,
    "stake": 74,
    "notes": "Executed from ACT signal"
  }'
```

## Core formulas

### Implied probability

```text
impliedProbability = 1 / decimalOdds
```

### Expected value

```text
EV% = (modelProbability * decimalOdds - 1) * 100
```

### Kelly stake

```text
b = decimalOdds - 1
p = modelProbability
q = 1 - p
fullKelly = (b*p - q) / b
fractionalKelly = fullKelly * kellyFraction
stake = bankroll * fractionalKelly
cappedStake = min(stake, bankroll * maxStakePct)
```

## Production notes

Before production:

1. Replace demo user logic with real authentication.
2. Use Supabase Auth or another identity provider.
3. Replace in-memory rate limiting with Redis/Upstash.
4. Add Stripe checkout and subscription webhooks.
5. Move signal polling to Supabase Realtime or durable websocket infrastructure.
6. Add audit logging for B2B API consumption.
7. Add model calibration, backtesting, CLV tracking, and market-level variance monitoring.
8. Add compliance copy: no guaranteed returns, betting risk disclaimer, jurisdiction restrictions.

## Environment variables

See `.env.example`.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/doctore_ai?schema=public"
B2B_API_KEY="doctore_demo_key_change_me"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CRON_SECRET="replace_me"
```

## Project structure

```text
app/
  api/              Backend API routes
  dashboard/        Edge feed dashboard
  kelly/            Fractional Kelly calculator
  bankroll/         Bankroll tracking UI
  pricing/          B2C/B2B pricing UI
  api-docs/         API documentation UI
components/         UI components
lib/                Calculation, validation, API key, rate limit and Prisma helpers
prisma/             Database schema and seed script
```
