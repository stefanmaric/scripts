'use strict'

const result = process.argv
  .slice(2)
  .reduce((acc, next) => acc + Number.parseInt(next, 10), 0)

console.log(result)
