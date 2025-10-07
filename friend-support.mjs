#!/usr/bin/env node

import http from 'http';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

// Define the port
const PORT = 5000;

// Create HTTP server
const server = http.createServer(async (req, res) => {
  try {
    // Only handle GET requests
    if (req.method !== 'GET') {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
      return;
    }

    // Extract guest name from URL path
    const guestName = decodeURIComponent(req.url.slice(1)); // remove leading '/'
    if (!guestName) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
      return;
    }

    try {
      // Try to read the corresponding JSON file (e.g., "Elis_Galindo.json")
      const filePath = resolve(`${guestName}.json`);
      const data = await readFile(filePath, 'utf8');

      // Parse JSON to ensure validity
      const guest = JSON.parse(data);

      // Return guest data
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(guest, null, 2));

    } catch {
      // File not found or JSON error
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'guest not found' }));
    }

  } catch {
    // Server failure
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'server failed' }));
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`🖥️  Friend Support server listening on port ${PORT}`);
});
