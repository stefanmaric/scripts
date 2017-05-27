'use strict'

const fs = require('fs')

fs.readFile(process.argv[2], 'utf8', function (err, content) {
  if (err) return console.error(err)
  console.log(content.match(/\n/g).length)
})
