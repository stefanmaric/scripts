'use strict'

const fs = require('fs')
const path = require('path')

const dir = process.argv[2]
const ext = '.' + process.argv[3]

fs.readdir(dir, function (err, data) {
  if (err) return console.error(err)
  data.filter(file => ext === path.extname(file)).forEach(file => console.log(file))
})
