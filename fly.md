## Fly.io Deployment Guide (tesseract.sbs)

This repository contains three services that will run independently on Fly.io:

| Service | Fly App Name (suggested) | Default Port | Purpose | Dockerfile |
| --- | --- | --- | --- | --- |
| Main website | `tesseract-main` | 8080 | React site served as static assets | `main_website/Dockerfile` |
| Activity tracker | `tesseract-activity` | 4000 | API + dashboard with SQLite | `activity_tracker/Dockerfile` |
| Timesheet device UI | `tesseract-device` | 8080 | IMU classifier + dashboard | `timesheet_device/Dockerfile` |

Each app deploys from the same monorepo; the Dockerfiles already know how to install, build, and start the correct packages.

---

### 1. Prerequisites

1. Install and authenticate the Fly CLI:
   ```bash
   brew install flyctl          # macOS (or use official installer)
   fly auth login
   ```
2. Ensure `pnpm` and Node ≥ 20 are available locally if you want to build/test before deployment.
3. Have DNS control over `tesseract.sbs` (you’ll point A/AAAA records at Fly later).

---

### 2. Common Build Notes

- All Dockerfiles run `pnpm install --frozen-lockfile` for the **entire** workspace. CI/CD takes a bit longer but keeps things simple.
- Runtime commands use scripts defined in each package:
  - `main_website`: `pnpm --filter ./main_website... run start`
  - `activity_tracker`: `pnpm --filter ./activity_tracker... run start`
  - `timesheet_device`: `pnpm --filter ./timesheet_device... run start`
- Set `VITE_*` build-time variables for the main website via Fly build arguments (see §4).

---

### 3. Activity Tracker (`tesseract-activity`)

1. Initialize the Fly app:
   ```bash
   cd activity_tracker
   fly launch \
     --name tesseract-activity \
     --no-deploy \
     --copy-config
   ```
   Accept the defaults when prompted. A `fly.toml` will be created inside `activity_tracker/`.

2. Ensure `fly.toml` contains the following key sections:
   ```toml
   app = "tesseract-activity"

   [build]
     dockerfile = "Dockerfile"

   [env]
     PORT = "4000"

   [[services]]
     internal_port = 4000
     auto_start_machines = true
     auto_stop_machines = "stop"
     processes = ["app"]

     [[services.ports]]
       port = 80
     [[services.ports]]
       port = 443
   ```

3. Create a persistent volume for the SQLite database:
   ```bash
   fly volumes create activity_data \
     --app tesseract-activity \
     --region <preferred-region> \
     --size 1
   ```

4. Mount the volume in `fly.toml`:
   ```toml
   [[mounts]]
     source = "activity_data"
     destination = "/data"
   ```

5. Set runtime secrets and env vars (adjust credentials to taste):
   ```bash
   fly secrets set \
     NODE_ENV=production \
     ENABLE_BASIC_AUTH=1 \
     BASIC_USER=hemanth \
     BASIC_PASSWORD=changeme \
     DB_PATH=/data/activity_data.sqlite \
     --app tesseract-activity
   ```

6. Deploy (run from the repo root so the Docker build sees the whole workspace):
   ```bash
   cd ..
   fly deploy \
     --config activity_tracker/fly.toml \
     --dockerfile activity_tracker/Dockerfile \
     --app tesseract-activity
   cd activity_tracker
   ```

7. Verify:
   ```bash
   fly logs -a tesseract-activity
   fly status -a tesseract-activity
   ```

---

### 4. Timesheet Device (`tesseract-device`)

1. Initialize:
   ```bash
   cd ../timesheet_device
   fly launch \
     --name tesseract-device \
     --no-deploy \
     --copy-config
   ```

2. Minimal `fly.toml` structure:
   ```toml
   app = "tesseract-device"

   [build]
     dockerfile = "Dockerfile"

   [env]
     PORT = "8080"

   [[services]]
     internal_port = 8080
     auto_start_machines = true
     auto_stop_machines = "stop"
     processes = ["app"]

     [[services.ports]]
       port = 80
     [[services.ports]]
       port = 443
   ```

3. Create a volume for the IMU readings database:
   ```bash
   fly volumes create timesheet_data \
     --app tesseract-device \
     --region <preferred-region> \
     --size 1
   ```

4. Add the mount:
   ```toml
   [[mounts]]
     source = "timesheet_data"
     destination = "/data"
   ```

5. Set secrets/env values:
   ```bash
   fly secrets set \
     NODE_ENV=production \
     TIMESHEET_DATA_DIR=/data \
     SIDE_REFERENCE_PATH=/app/timesheet_device/data/side_reference.json \
     MQTT_BROKER_URL=mqtt://broker.hivemq.com:1883 \
     MQTT_TOPIC=test/Device1_status \
     --app tesseract-device
   ```
   - Use your production MQTT broker + topic if different.
   - The reference JSON ships inside the image; leave the path as-is unless you maintain it elsewhere.

6. Deploy (run from the repo root so the Docker build sees the whole workspace):
   ```bash
   cd ..
   fly deploy \
     --config timesheet_device/fly.toml \
     --dockerfile timesheet_device/Dockerfile \
     --app tesseract-device
   cd timesheet_device
   ```

7. Confirm the REST endpoint:
   ```bash
   fly open --app tesseract-device
   # should show the JSON landing page / timesheet UI
   ```

---

### 5. Main Website (`tesseract-main`)

1. Initialize:
   ```bash
   cd ../main_website
   fly launch \
     --name tesseract-main \
     --no-deploy \
     --copy-config
   ```

2. Example `fly.toml`:
   ```toml
   app = "tesseract-main"

   [build]
     dockerfile = "Dockerfile"

   [env]
     PORT = "8080"

   [[services]]
     internal_port = 8080
     auto_start_machines = true
     auto_stop_machines = "stop"
     processes = ["app"]

     [[services.ports]]
       port = 80
     [[services.ports]]
       port = 443
   ```

3. (Optional) Pass `VITE_*` build args so the bundle references the deployed services. Remember to deploy from the repo root:
   ```bash
   cd ..
   fly deploy \
     --config main_website/fly.toml \
     --dockerfile main_website/Dockerfile \
     --app tesseract-main \
     --build-arg VITE_ACTIVITY_IFRAME_URL=https://activity.tesseract.sbs \
     --build-arg VITE_TIMESHEET_IFRAME_URL=https://device.tesseract.sbs/timesheet-app/ \
     --build-arg VITE_ACTIVITY_PUBLIC_URL=https://activity.tesseract.sbs/public/steps
   cd main_website
   ```

   If you skip the build args, the default fallbacks still point at `https://activity.tesseract.sbs` and local paths, so update them once your subdomains are ready.

---

### 6. Domain + TLS for `tesseract.sbs`

1. Allocate public IPs for each app (or reuse one app as your “edge” and CNAME others):
   ```bash
   fly ips allocate-v4 --app tesseract-main
   fly ips allocate-v6 --app tesseract-main

   fly ips allocate-v4 --app tesseract-activity
   fly ips allocate-v4 --app tesseract-device
   ```

2. In your DNS provider, create A (and AAAA if desired) records:
   - `tesseract.sbs` → the IPv4 from `tesseract-main`
   - `activity.tesseract.sbs` → IPv4 from `tesseract-activity`
   - `device.tesseract.sbs` → IPv4 from `tesseract-device`

   Alternatively, you can point all subdomains to Fly’s shared Anycast IP (`fly ips list`) and use Fly’s hostname routing.

3. Register certificates with Fly (it provisions Let’s Encrypt automatically):
   ```bash
   fly certificates add tesseract.sbs --app tesseract-main
   fly certificates add activity.tesseract.sbs --app tesseract-activity
   fly certificates add device.tesseract.sbs --app tesseract-device
   ```

4. Monitor:
   ```bash
   fly certificates list -a tesseract-main
   ```
   Certificates remain in `Pending` until DNS changes propagate.

---

### 7. After Deployment

- Check logs anytime:
  ```bash
  fly logs -a tesseract-main
  fly logs -a tesseract-activity
  fly logs -a tesseract-device
  ```
- Scale machine size or count if necessary:
  ```bash
  fly scale vm shared-cpu-1x --memory 512 --app tesseract-main
  ```
- Run database migrations / copy static reference data into volumes if needed:
  ```bash
  # Example: copy reference JSON into the timesheet volume (first run)
  fly ssh console -a tesseract-device
  cp /app/timesheet_device/data/side_reference.json /data/side_reference.json
  exit
  ```
- To redeploy after code changes:
  ```bash
  fly deploy --app tesseract-activity
  fly deploy --app tesseract-device
  fly deploy --app tesseract-main --build-arg ...
  ```

---

### 8. Summary Checklist

1. `fly auth login`
2. `fly launch` each service (no deploy yet)
3. Configure `fly.toml` + volumes + secrets
4. Deploy each app
5. Point DNS for `tesseract.sbs`, `activity.tesseract.sbs`, `device.tesseract.sbs`
6. Add certificates on Fly and verify
7. (Optional) Update main-site build args and redeploy so it references the new URLs

Once all three services are up, `https://tesseract.sbs` will display the main site, embed the remote dashboards, and fetch activity stats from Fly-hosted APIs. `https://activity.tesseract.sbs` and `https://device.tesseract.sbs` expose the standalone dashboards directly.
