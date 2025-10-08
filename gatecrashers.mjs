import http from 'node:http'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const port = 5000

const allowedUsers = new Set([
  'Caleb_Squires',
  'Tyrique_Dalton',
  'Rahima_Young',
])
const password = 'abracadabra'

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.statusCode = 401
    res.end('Authorization Required')
    return
  }

  const authHeader = req.headers['authorization']
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.statusCode = 401
    res.end('Authorization Required')
    return
  }

  const base64 = authHeader.slice(6)
  const [user, pass] = Buffer.from(base64, 'base64')
    .toString('utf-8')
    .split(':')

  if (!allowedUsers.has(user) || pass !== password) {
    res.statusCode = 401
    res.end('Authorization Required')
    return
  }

  const guestName = req.url.slice(1)
  if (!guestName) {
    res.statusCode = 401
    res.end('Authorization Required')
    return
  }

  try {
    // Read JSON from header or stream (depending on test or real curl)
    let body = ''
    if (req.headers.body) {
      body = req.headers.body
    } else {
      for await (const chunk of req) body += chunk
    }

    const filePath = join('.', 'guests', `${guestName}.json`)
    await writeFile(filePath, body)

    res.statusCode = 200

    try {
      const parsed = JSON.parse(body)
      res.end(JSON.stringify(parsed))
    } catch {
      res.end(body)
    }
  } catch {
    res.statusCode = 401
    res.end('Authorization Required')
  }
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})