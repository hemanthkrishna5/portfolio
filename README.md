Activity Tracker — Dev + Tunnel

Quick steps to run the local dev server and expose it via Cloudflare Tunnel.

Run locally (PowerShell)

1) Change into the app folder and install once:

    cd activity_tracker
    pnpm install

2) Start the dev server first:

    pnpm run dev

The server listens on http://localhost:4000 by default.

3) In a second PowerShell (also inside `activity_tracker`), run the tunnel:

    cloudflared tunnel run activity-tracking

Notes
- If you need a specific port, set it before step 2: `$env:PORT=4000`
- Optional auth for write endpoints: `$env:BASIC_USER='user'; $env:BASIC_PASSWORD='yourpassword'`
- Ensure your named tunnel `activity-tracking` exists and is configured in Cloudflare.
