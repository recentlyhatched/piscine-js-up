#!/usr/bin/env node

import http from 'http';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  try {
    // Only handle POST requests
    if (req.method !== 'POST') {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'server failed' }));
      return;
    }

    // Extract guest name from URL (e.g. /Ronaldinho)
    const guestName = decodeURIComponent(req.url.slice(1));
    if (!guestName) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'server failed' }));
      return;
    }

    // Collect request body
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        // Parse JSON from request body
        const data = JSON.parse(body);

        // Save JSON file inside "guests" directory
        const filePath = resolve('guests', `${guestName}.json`);
        await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

        // Respond with the same JSON
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch {
        // If anything fails (JSON parse, write error)
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'server failed' }));
      }
    });

    req.on('error', () => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'server failed' }));
    });

  } catch {
    // Any unexpected server error
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
  }
});

// Start listening
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
