import fs from 'fs/promises';
import path from 'path';

async function handlePost(req, res) {
  const filename = path.basename(req.url);
  const filepath = path.join(GUESTS_DIR, `${filename}.json`);

  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      if (!body) throw new Error('Empty request body');

      // Parse JSON
      const jsonData = JSON.parse(body);

      // Ensure the guests directory exists
      await fs.mkdir(GUESTS_DIR, { recursive: true });

      // Write the parsed JSON to the file
      await fs.writeFile(filepath, JSON.stringify(jsonData, null, 2), 'utf8');

      // Respond with JSON object
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(jsonData));

    } catch (error) {
      console.error('Error handling POST request:', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  });
}
