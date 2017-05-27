'use strict'

const stream = require('stream')
const http = require('http')

const PORT = process.argv[2]

const uppercaseTransform = new stream.Transform({
  transform: function transform (chunk, encoding, done) {
    this.push(chunk.toString().toUpperCase())
    done()
  }
})

http.createServer(requestListener)
  .on('error', console.error)
  .listen(PORT)

function requestListener (req, res) {
  res.writeHead(200, 'text/plain')
  req.pipe(uppercaseTransform).pipe(res)
}
