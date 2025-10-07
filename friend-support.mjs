#!/usr/bin/env node

import http from 'http';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
      return;
    }

    // Extract guest name (strip leading '/')
    const guestName = decodeURIComponent(req.url.slice(1));
    if (!guestName) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
      return;
    }

    try {
      // ✅ Look for the file inside the "guests" directory
      const filePath = resolve('guests', `${guestName}.json`);
      const data = await readFile(filePath, 'utf8');
      const guest = JSON.parse(data);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(guest));
    } catch {
      // File not found or invalid JSON
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
    }
  } catch {
    // Internal server error
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
