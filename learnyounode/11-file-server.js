'use strict'

const http = require('http')
const fs = require('fs')

const PORT = process.argv[2]
const filePath = process.argv[3]

http.createServer(requestListener)
  .on('error', console.error)
  .listen(PORT)

function requestListener (req, res) {
  res.writeHead(200, 'text/plain')
  fs.createReadStream(filePath).pipe(res)
}
