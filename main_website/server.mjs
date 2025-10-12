import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, 'dist');

const app = express();

app.use(express.static(distPath));

app.get('*', (_request, response) => {
  response.sendFile(path.join(distPath, 'index.html'));
});

const port = Number(process.env.PORT ?? 8080);

app.listen(port, '0.0.0.0', () => {
  console.log(`[main-site] listening on http://0.0.0.0:${port}`);
});
