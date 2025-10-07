import http from 'http';
import fs from 'fs';
import path from 'path';

// Authorized users
const USERS = {
  'Caleb_Squires': 'abracadabra',
  'Tyrique_Dalton': 'abracadabra',
  'Rahima_Young': 'abracadabra'
};

const PORT = 5000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const authHeader = req.headers['authorization'];

    // Check for Basic Auth header
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Restricted Area"', 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Authorization Required' }));
      return;
    }

    // Decode Base64 username:password
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
    const [username, password] = credentials.split(':');

    // Validate credentials
    if (!USERS[username] || USERS[username] !== password) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Restricted Area"', 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }

    // Collect request body
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const jsonData = JSON.parse(body);

        // Save JSON to file named after the URL (remove leading slash)
        const guestName = req.url.slice(1);
        const filePath = path.join('./guests', `${guestName}.json`);
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

        // Respond with JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(jsonData));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });

  } else {
    // Not a POST request
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
