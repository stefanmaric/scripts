'use strict'

const fs = require('fs')
const path = require('path')

module.exports = filterByExt

function filterByExt (dir, ext, cb) {
  ext = '.' + ext
  fs.readdir(dir, function (err, data) {
    if (err) return cb(err)
    cb(
      null,
      data.filter(file => ext === path.extname(file))
    )
  })
}
