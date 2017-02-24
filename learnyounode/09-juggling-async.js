'use strict'

const http = require('http')
const urls = process.argv.slice(2)

asyncMap(urls, fetchUrl, function (err, data) {
  if (err) throw err
  data.forEach(item => console.log(item))
})

function fetchUrl (url, callback) {
  http.get(url, function (response) {
    let data = ''
    response.setEncoding('utf8')
    response.on('data', function (chunk) { data += chunk.toString() })
    response.on('end', function () {
      callback(null, data)
    })
  }).on('error', callback)
}

function asyncMap (items, iterator, callback) {
  if (items.length === 0) return callback(undefined, items)

  let resultItems = new Array(items.length)
  let count = 0
  let returned = false

  items.forEach(function (item, index) {
    iterator(item, function (error, result) {
      if (returned) return
      if (error) {
        returned = true
        return callback(error)
      }
      resultItems[index] = result
      count += 1
      if (count === items.length) return callback(undefined, resultItems)
    })
  })
}
