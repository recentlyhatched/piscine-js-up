#!/usr/bin/env node

import http from 'http';
import { writeFile, mkdir } from 'fs/promises';
import { resolve } from 'path';

const PORT = 5000;

// Allowed users and their shared password
const ALLOWED_USERS = ['Caleb_Squires', 'Tyrique_Dalton', 'Rahima_Young'];
const SECRET_PASSWORD = 'abracadabra';

/**
 * Parses the 'Authorization' header for Basic Auth credentials.
 * @param {http.IncomingMessage} req - The request object.
 * @returns {{username: string, password: string} | null} - Credentials or null if not found/invalid.
 */
function getBasicAuthCredentials(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null;
  }

  // Extract the base64 encoded part and decode it
  const b64Auth = authHeader.slice(6).trim();
  const credentialsString = Buffer.from(b64Auth, 'base64').toString();

  const parts = credentialsString.split(':');
  if (parts.length !== 2) {
    return null;
  }

  const [username, password] = parts;
  return { username, password };
}

/**
 * Middleware-like function to handle 401 Unauthorized response.
 * @param {http.ServerResponse} res - The response object.
 */
function respondUnauthorized(res) {
  // Set the WWW-Authenticate header to prompt the client for credentials
  res.writeHead(401, {
    'Content-Type': 'application/json',
    'WWW-Authenticate': 'Basic realm="Guest List Modification"',
  });
  res.end('Authorization Required');
}

const server = http.createServer((req, res) => {
  // 1. Authentication Check
  const credentials = getBasicAuthCredentials(req);
  const isAuthorized = credentials &&
                       ALLOWED_USERS.includes(credentials.username) &&
                       credentials.password === SECRET_PASSWORD;

  if (!isAuthorized) {
    respondUnauthorized(res);
    return;
  }

  // 2. Original Logic: Only POST is handled for creating/updating guests
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

        // Respond with the parsed object (HTTP/1.1 200 OK or 201 Created are fine)
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(parsed));
      } catch (parseErr) {
        // Body is not valid JSON — still save body as-is and return 200.
        // Save the raw body to the file (overwrite existing file).
        await writeFile(filePath, body, 'utf8');

        // Return a JSON object that contains the raw data (always respond with valid JSON)
        res.writeHead(200, { 'Content-Type': 'application/json' });
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