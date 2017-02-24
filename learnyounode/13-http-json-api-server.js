'use strict'

const http = require('http')
const url = require('url')

const PORT = process.argv[2]

const ROUTES = {
  '/api/parsetime': getTimeObject,
  '/api/unixtime': getUnixTime
}

http.createServer(requestListener)
  .on('error', console.error)
  .listen(PORT)

function requestListener (req, res) {
  const urlData = url.parse(req.url, true)
  const resData = ROUTES[urlData.pathname](new Date(urlData.query.iso))

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(resData))
}

function getUnixTime (date) {
  return {
    unixtime: date.getTime()
  }
}

function getTimeObject (date) {
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
}
