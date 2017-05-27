'use strict'

const filterByExt = require('./06-make-it-modular.lib')

const dir = process.argv[2]
const ext = process.argv[3]

filterByExt(dir, ext, function (err, data) {
  if (err) return console.error(err)
  data.forEach(file => console.log(file))
})
