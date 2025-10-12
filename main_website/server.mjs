import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, 'dist');

const app = express();

const activityApiUrl =
  process.env.ACTIVITY_API_URL ?? 'https://activity.tesseract.sbs/api/daily';
const activityBasicAuthEnv = process.env.ACTIVITY_API_BASIC_AUTH;
const activityApiUser =
  process.env.ACTIVITY_API_USER ?? (activityBasicAuthEnv ? undefined : 'hemanth');
const activityApiPassword =
  process.env.ACTIVITY_API_PASSWORD ?? (activityBasicAuthEnv ? undefined : 'anisha334');

function resolveActivityAuthHeader() {
  if (activityBasicAuthEnv && activityBasicAuthEnv.length > 0) {
    return activityBasicAuthEnv.startsWith('Basic ')
      ? activityBasicAuthEnv
      : `Basic ${activityBasicAuthEnv}`;
  }
  if (activityApiUser && activityApiPassword) {
    return `Basic ${Buffer.from(`${activityApiUser}:${activityApiPassword}`).toString('base64')}`;
  }
  return null;
}

const activityAuthHeader = resolveActivityAuthHeader();

app.get('/api/activity/daily', async (request, response) => {
  try {
    let headers;
    const forwarded = request.headers['x-activity-basic-auth'];
    if (typeof forwarded === 'string' && forwarded.length > 0) {
      headers = {
        Authorization: forwarded.startsWith('Basic ') ? forwarded : `Basic ${forwarded}`,
      };
    } else if (activityAuthHeader) {
      headers = { Authorization: activityAuthHeader };
    }
    const timeoutMsRaw = Number.parseInt(process.env.ACTIVITY_API_TIMEOUT_MS ?? '5000', 10);
    const timeoutMs = Number.isFinite(timeoutMsRaw) ? timeoutMsRaw : 5000;
    const signal =
      typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
        ? AbortSignal.timeout(timeoutMs)
        : undefined;

    const upstream = await fetch(activityApiUrl, {
      headers,
      signal,
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      response
        .status(upstream.status)
        .json({ error: 'upstream_error', status: upstream.status, message: text || 'Failed' });
      return;
    }

    const payload = await upstream.json();
    response.json(payload);
  } catch (error) {
    console.error('[main-site] failed to proxy activity data:', error);
    response.status(502).json({
      error: 'bad_gateway',
      message: 'Unable to reach activity backend',
    });
  }
});

app.use(express.static(distPath));

app.get(/.*/, (_request, response) => {
  response.sendFile(path.join(distPath, 'index.html'));
});

const port = Number(process.env.PORT ?? 8080);

app.listen(port, '0.0.0.0', () => {
  console.log(`[main-site] listening on http://0.0.0.0:${port}`);
});
