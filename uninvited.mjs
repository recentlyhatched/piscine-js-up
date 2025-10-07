#!/usr/bin/env node

import http from 'http';
import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

const PORT = 5000;

const server = http.createServer((req, res) => {
  // Only POST is handled for creating/updating guests
  if (req.method !== 'POST') {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
    return;
  }

  const guestName = decodeURIComponent(req.url.slice(1)); // strip leading '/'
  if (!guestName) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
    return;
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', async () => {
    try {
      // Ensure guests directory exists
      const guestsDir = resolve('guests');
      await mkdir(guestsDir, { recursive: true });

      const filePath = resolve(guestsDir, `${guestName}.json`);

      // Try to parse body as JSON
      try {
        const parsed = JSON.parse(body);
        // Save pretty JSON to file
        await writeFile(filePath, JSON.stringify(parsed, null, 2), 'utf8');

        // Respond with the parsed object
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsed));
      } catch (parseErr) {
        // Body is not valid JSON — still save body as-is and return 201.
        // Save the raw body to the file (overwrite existing file).
        await writeFile(filePath, body, 'utf8');

        // Return a JSON object that contains the raw data (always respond with valid JSON)
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: body }));
      }
    } catch (err) {
      // Any write/mkdir or unexpected error -> 500 with server failed
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
