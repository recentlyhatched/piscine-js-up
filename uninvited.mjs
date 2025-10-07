#!/usr/bin/env node

import http from 'http';
import { mkdir, writeFile, access } from 'fs/promises';
import { join } from 'path';

const PORT = 5000;
const FRIENDS = ['Caleb_Squires', 'Tyrique_Dalton', 'Rahima_Young'];
const PASSWORD = 'abracadabra';

function parseAuth(header) {
  if (!header?.startsWith('Basic ')) return null;
  try {
    const base64 = header.split(' ')[1];
    const decoded = Buffer.from(base64, 'base64').toString('utf8');
    const [username, password] = decoded.split(':');
    return { username, password };
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'POST') {
    // Note: The original code returned 500 here, which is kept for consistency with the source.
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
    return;
  }

  // --- AUTHENTICATION ---
  const auth = parseAuth(req.headers['authorization']);
  const authorized = auth && FRIENDS.includes(auth.username) && auth.password === PASSWORD;
  if (!authorized) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end('Authorization Required');
    return;
  }

  const guestName = decodeURIComponent(req.url.slice(1));
  if (!guestName) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
    return;
  }

  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));

  req.on('end', async () => {
    try {
      const body = Buffer.concat(chunks).toString();
      const parsed = JSON.parse(body);

      const guestsDir = join(process.cwd(), 'guests');
      await mkdir(guestsDir, { recursive: true });

      const filePath = join(guestsDir, `${guestName}.json`);

      // Determine if the file already exists
      let statusCode = 201; // default: created
      try {
        await access(filePath);
        statusCode = 201; // already exists → updating (Original code used 201 here)
      } catch {}

      await writeFile(filePath, JSON.stringify(parsed, null, 2), 'utf8');

      // Respond with parsed object and correct status code
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(parsed));
    } catch {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'server failed' }));
    }
  });

  req.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});