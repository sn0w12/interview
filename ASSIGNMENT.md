# ⚡ 2-Hour Candidate Task — Weather API Wrapper (Lite) + React UI
**Tech Stack:** NestJS backend + React frontend (candidate chooses UI library/CSS)

## 🧠 Goal
This repo contains a partially completed NestJS backend. Your task is to finish the backend and build a simple React UI that consumes it. You may choose any UI library or styling approach (e.g., Tailwind, MUI, Chakra, plain CSS).

## Repo Layout
- `backend/` - NestJS API starter
- `frontend/` - Empty folder for your React app

## ✅ Backend Tasks (Target: ~60 minutes)

1. **Input Validation**
   - Add a DTO for `/weather` with `city: string` (required).
   - Trim whitespace and reject empty strings with a clear 400 message.
   - Enable global `ValidationPipe` (already present — tweak as needed).

2. **API Key Check**
   - Ensure the app clearly fails fast at startup if `VC_API_KEY` is missing (throw or log + exit).

3. **Normalized Response**
   - Return a simplified response shape the frontend can use directly:
     - `city`, `temperature`, `description`, `humidity`, `windSpeed`, `timestamp`, `unitGroup`, `source`
   - Map fields from the Visual Crossing payload (`data.currentConditions`).

4. **Caching**
   - Use the provided in-memory cache with TTL from config.
   - Normalize cache keys (lowercase city + unit group).
   - Log cache hits/misses.

5. **Error Handling**
   - Map upstream errors:
     - `404` → `BadRequestException("City not found")`
     - other failures → `ServiceUnavailableException("Weather provider unavailable")`

6. **README Update**
   - Update `backend/README.md` with setup/run instructions and API testing steps.
   - Mention the caching approach and TTL.

## ✅ Frontend Tasks (Target: ~60 minutes)

1. **React App**
   - Create a React app (Vite/CRA or similar). Place it in a `frontend/` folder.
   - You may choose any UI library or styling approach.

2. **Weather UI**
   - Input for city name + search/submit action.
   - Fetch `GET /weather?city=...` from the backend.
   - Display key fields: `city`, `temperature`, `description`, `humidity`, `windSpeed`, `timestamp` (plus `source` if desired).
   - Show loading and error states clearly.
   - Basic client-side validation for empty city input.

3. **Usability**
   - Make it responsive for mobile and desktop.
   - Keep the UI clean and easy to understand.
   - Persist the last successful city in `localStorage` and prefill it on load.
   - Maintain a small list of recent searches (max 5) that can be clicked to re-run.

4. **README Update**
   - Update `frontend/README.md` with frontend setup/run instructions.
   - Document how to configure the API base URL (env var or config file).

## 🌟 Optional Stretch Goals
- Add a unit toggle (metric/us) by extending the backend to accept a `unitGroup` query param.
- Abort in-flight requests when a new search is triggered.
- Add one unit test for the service and one component test for the UI.

## 🕒 Submission
- GitHub link or ZIP file
- Updated `backend/README.md` and `frontend/README.md`

## 💡 Evaluation Focus
- Backend works as specified (returns JSON for `/weather?city=...`)
- Clean NestJS structure, DTO usage, and exceptions
- Frontend UX: clarity, error handling, responsiveness
- Data modeling: clean mapping from provider response to UI-ready shape
- Clear README and easy local setup
