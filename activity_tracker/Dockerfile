FROM node:22-bullseye AS base

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Pre-copy workspace manifests so pnpm can resolve dependencies efficiently.
COPY activity_tracker/package.json activity_tracker/tsconfig.json ./activity_tracker/
COPY activity_tracker/client/package.json activity_tracker/client/vite.config.ts ./activity_tracker/client/
COPY main_website/package.json ./main_website/
COPY timesheet_device/package.json ./timesheet_device/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter ./activity_tracker... run build

ENV NODE_ENV=production

WORKDIR /app/activity_tracker

CMD ["pnpm", "run", "start"]
