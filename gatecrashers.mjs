// Corrected logic for handlePost in gatecrashers.mjs

async function handlePost(req, res) {
    const filename = path.basename(req.url); 
    const filepath = path.join(GUESTS_DIR, `${filename}.json`);

    let body = '';
    // Reading the request body
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            // 1. Ensure the guests directory exists
            await fs.mkdir(GUESTS_DIR, { recursive: true });

            // 2. Store the body content in the file
            await fs.writeFile(filepath, body, 'utf8');

            // 3. Set response headers and status
            res.setHeader('Content-Type', 'application/json');
            // Adding Content-Length can sometimes help ensure the entire body is transmitted
            res.setHeader('Content-Length', Buffer.byteLength(body, 'utf8')); 
            res.writeHead(200);

            // 4. Respond with the content that was just stored
            res.end(body);

        } catch (error) {
            console.error('Error handling POST request:', error);
            // Handle file or JSON errors gracefully
            res.setHeader('Content-Type', 'text/plain');
            res.writeHead(500);
            res.end('Internal Server Error');
        }
    });
}