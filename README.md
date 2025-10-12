Activity Tracker — Local Development

Run the API + dashboard locally:

1. Install dependencies:

       cd activity_tracker
       pnpm install

2. Start the dev processes (API + client + Vite proxy):

       pnpm run dev

The API serves on `http://localhost:4000`, and the React dashboard is proxied through Vite at `http://localhost:5173/activity-tracker/`.

Notes
- Change the API port with `PORT=4000 pnpm run dev`.
- Set `ENABLE_BASIC_AUTH=1` (and `BASIC_USER`/`BASIC_PASSWORD`) to enforce credentials even in development.
