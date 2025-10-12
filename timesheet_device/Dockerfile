FROM node:22-bullseye

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY timesheet_device/package.json timesheet_device/tsconfig.json timesheet_device/tsconfig.server.json ./timesheet_device/
COPY timesheet_device/vite.config.ts ./timesheet_device/
COPY main_website/package.json ./main_website/
COPY activity_tracker/package.json ./activity_tracker/
COPY activity_tracker/client/package.json ./activity_tracker/client/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter ./timesheet_device... run build

ENV NODE_ENV=production

WORKDIR /app/timesheet_device

CMD ["pnpm", "run", "start"]
