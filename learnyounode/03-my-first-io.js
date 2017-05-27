'use strict'

const fs = require('fs')
const filePath = process.argv[2]
const result = fs.readFileSync(filePath, 'utf8').match(/\n/g).length

console.log(result)
