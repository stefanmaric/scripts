'use strict'

const http = require('http')
const url = process.argv[2]

http.get(url, function (response) {
  let data = ''
  response.setEncoding('utf8')
  response.on('data', function (chunk) { data += chunk.toString() })
  response.on('end', function () {
    console.log(data.length)
    console.log(data)
  })
}).on('error', console.error)
