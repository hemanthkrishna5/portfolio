#!/usr/bin/env node

const { spawn } = require("node:child_process");

const tunnelName = process.env.CLOUDFLARE_TUNNEL_NAME || "activity-tracking";
const shouldSkip = String(process.env.SKIP_CLOUDFLARE_TUNNEL || "").toLowerCase();

if (["1", "true", "yes"].includes(shouldSkip)) {
  console.log("[tunnel] skipping Cloudflare tunnel because SKIP_CLOUDFLARE_TUNNEL is set.");
  process.exit(0);
}

try {
  const child = spawn("cloudflared", ["tunnel", "run", tunnelName], {
    stdio: "inherit"
  });

  child.on("error", (error) => {
    if (error.code === "ENOENT") {
      console.warn("[tunnel] cloudflared binary not found. Install it or set SKIP_CLOUDFLARE_TUNNEL=1 to silence this message.");
      process.exit(0);
      return;
    }

    console.error(`[tunnel] failed to start: ${error.message}`);
    process.exit(1);
  });

  child.on("exit", (code, signal) => {
    if (typeof code === "number") {
      process.exit(code);
      return;
    }

    if (signal) {
      console.error(`[tunnel] terminated due to signal: ${signal}`);
      process.exit(1);
    }
  });
} catch (error) {
  if (error && error.code === "ENOENT") {
    console.warn("[tunnel] cloudflared binary not found. Install it or set SKIP_CLOUDFLARE_TUNNEL=1 to silence this message.");
    process.exit(0);
  } else {
    console.error(`[tunnel] unexpected error starting tunnel: ${error.message}`);
    process.exit(1);
  }
}
