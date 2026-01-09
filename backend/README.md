# Weather API Wrapper (Lite) - Backend

This is the NestJS starter API for the assignment. It wraps the Visual Crossing Weather API and caches responses in memory.

## Prerequisites

- Node.js 18+ and npm
- Visual Crossing API key

## Get an API Key

1. Create a free account at https://www.visualcrossing.com/weather-api
2. Sign in and open your Dashboard or Account → API Keys
3. Copy the key and set it as `VC_API_KEY` in `.env`

## Setup

From repo root:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and set your API key:

```env
VC_API_KEY=your_key_here
PORT=3000
CACHE_TTL_SECONDS=1800
```

Install dependencies and run the server:

```bash
npm install
npm run start:dev
```

The API runs at `http://localhost:3000`.

## API

`GET /weather?city=Stockholm`

Response:

```json
{
  "source": "cache",
  "city": "Stockholm",
  "unitGroup": "metric",
  "fetchedAt": "2025-01-01T00:00:00.000Z",
  "data": {
    "temperature": 0,
    "description": "Partially cloudy",
    "humidity": 0,
    "windSpeed": 0,
    "timestamp": "12:00:00",
    "icon": "clear-day"
  }
}
```

## Optional unitGroup

`GET /weather?city=Stockholm&unitGroup=us`

Response:

```json
{
  "source": "cache",
  "city": "Stockholm",
  "unitGroup": "us",
  "fetchedAt": "2025-01-01T00:00:00.000Z",
  "data": {
    "temperature": 0,
    "description": "Partially cloudy",
    "humidity": 0,
    "windSpeed": 0,
    "timestamp": "12:00:00"
  }
}
```

## Configuration

- `PORT` (default: `3000`)
- `VC_API_KEY` (required)
- `CACHE_TTL_SECONDS` (default: `1800`)

## Caching

Caching is done in memory as a key-value map according to the env variable `CACHE_TTL_SECONDS`, the key is as follows: `weather:${unitGroup.toLowerCase()}:${city.toLowerCase()}`

Cache usage is logged as either hit or miss per city.

## Scripts

```bash
npm run start
npm run start:dev
npm run build
npm run test
```
