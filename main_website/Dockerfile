FROM node:22-bullseye

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

ARG VITE_ACTIVITY_IFRAME_URL
ARG VITE_TIMESHEET_IFRAME_URL
ARG VITE_ACTIVITY_PUBLIC_URL

ENV VITE_ACTIVITY_IFRAME_URL=$VITE_ACTIVITY_IFRAME_URL
ENV VITE_TIMESHEET_IFRAME_URL=$VITE_TIMESHEET_IFRAME_URL
ENV VITE_ACTIVITY_PUBLIC_URL=$VITE_ACTIVITY_PUBLIC_URL

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY main_website/package.json main_website/tsconfig.json main_website/tsconfig.app.json main_website/tsconfig.node.json ./main_website/
COPY activity_tracker/package.json ./activity_tracker/
COPY activity_tracker/client/package.json ./activity_tracker/client/
COPY timesheet_device/package.json ./timesheet_device/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm --filter ./main_website... run build

ENV NODE_ENV=production

WORKDIR /app/main_website

CMD ["pnpm", "run", "start"]
