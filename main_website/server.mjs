import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  listSecretSummaries,
  createSecretEntry,
  getSecretQuestion,
  verifySecretAnswer,
  updateSecretEntry,
  deleteSecretEntry,
} from './server/secretsStore.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, 'dist');

const app = express();
app.use(express.json({ limit: '512kb' }));

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

app.get('/api/secrets', async (_request, response) => {
  try {
    const entries = await listSecretSummaries();
    response.json({ entries });
  } catch (error) {
    console.error('[secrets] failed to list entries', error);
    response.status(500).json({ error: 'list_failed', message: 'Unable to list secrets' });
  }
});

app.post('/api/secrets', async (request, response) => {
  try {
    const payload = request.body ?? {};
    const created = await createSecretEntry({
      personName: payload.personName,
      wifiName: payload.wifiName,
      wifiPassword: payload.wifiPassword,
      securityQuestion: payload.securityQuestion,
      securityAnswer: payload.securityAnswer,
    });
    response.status(201).json({ entry: created });
  } catch (error) {
    console.error('[secrets] failed to create entry', error);
    const message = error instanceof Error ? error.message : 'Unable to create entry';
    const validationErrors = [
      'Wi-Fi name is required',
      'Wi-Fi password is required',
      'Security question is required',
      'Security answer is required',
      'Answer cannot be empty',
    ];
    const status = validationErrors.includes(message) ? 400 : 500;
    response.status(status).json({ error: 'create_failed', message });
  }
});

app.get('/api/secrets/:id/question', async (request, response) => {
  try {
    const question = await getSecretQuestion(request.params.id);
    if (!question) {
      response.status(404).json({ error: 'not_found', message: 'Entry not found' });
      return;
    }
    response.json(question);
  } catch (error) {
    console.error('[secrets] failed to load question', error);
    response.status(500).json({ error: 'question_failed', message: 'Unable to load question' });
  }
});

app.post('/api/secrets/:id/verify', async (request, response) => {
  const answer = request.body?.answer ?? '';
  try {
    const verified = await verifySecretAnswer(request.params.id, answer);
    if (verified === null) {
      response.status(404).json({ error: 'not_found', message: 'Entry not found' });
      return;
    }
    if (verified === false) {
      response.status(403).json({ error: 'invalid_answer', message: 'Incorrect answer' });
      return;
    }
    response.json({ entry: verified });
  } catch (error) {
    console.error('[secrets] failed to verify answer', error);
    const message = error instanceof Error ? error.message : 'Unable to verify answer';
    const status = message === 'Answer cannot be empty' ? 400 : 500;
    response.status(status).json({ error: 'verify_failed', message });
  }
});

app.put('/api/secrets/:id', async (request, response) => {
  try {
    const updated = await updateSecretEntry(request.params.id, {
      personName: request.body?.personName,
      wifiName: request.body?.wifiName,
      wifiPassword: request.body?.wifiPassword,
      securityQuestion: request.body?.securityQuestion,
      securityAnswer: request.body?.securityAnswer,
      answer: request.body?.answer,
    });
    if (updated === null) {
      response.status(404).json({ error: 'not_found', message: 'Entry not found' });
      return;
    }
    if (updated === false) {
      response.status(403).json({ error: 'invalid_answer', message: 'Incorrect answer' });
      return;
    }
    response.json({ entry: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to update entry';
    const validationErrors = [
      'Wi-Fi name is required',
      'Wi-Fi password is required',
      'Security question is required',
      'Security answer is required',
      'Security answer is required for updates',
      'Answer cannot be empty',
    ];
    const status = validationErrors.includes(message) ? 400 : 500;
    console.error('[secrets] failed to update entry', error);
    response.status(status).json({ error: 'update_failed', message });
  }
});

app.delete('/api/secrets/:id', async (request, response) => {
  try {
    const removed = await deleteSecretEntry(request.params.id);
    if (!removed) {
      response.status(404).json({ error: 'not_found', message: 'Entry not found' });
      return;
    }
    response.status(204).send();
  } catch (error) {
    console.error('[secrets] failed to delete entry', error);
    response.status(500).json({ error: 'delete_failed', message: 'Unable to delete entry' });
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
