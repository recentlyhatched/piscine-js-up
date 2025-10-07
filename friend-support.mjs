#!/usr/bin/env node

import http from 'http';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { access } from 'fs/promises';
import { constants } from 'fs';

const PORT = 5000;

const server = http.createServer(async (req, res) => {
  try {
    if (req.method !== 'GET') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
      return;
    }

    // Extract guest name from path (e.g. /Elis_Galindo)
    const guestName = decodeURIComponent(req.url.slice(1));
    if (!guestName) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
      return;
    }

    // File path inside "guests" directory
    const filePath = resolve('guests', `${guestName}.json`);

    try {
      // ✅ Check if file exists and is readable
      await access(filePath, constants.F_OK | constants.R_OK);

      // Read and parse file
      const data = await readFile(filePath, 'utf8');
      const guest = JSON.parse(data);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(guest));
    } catch (err) {
      // Distinguish errors
      if (err.code === 'ENOENT') {
        // File does not exist
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'guest not found' }));
      } else {
        // Exists but not readable, or JSON parsing fails
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'server failed' }));
      }
    }
  } catch {
    // Any other unexpected server error
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
