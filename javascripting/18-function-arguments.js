;(function () {
  'use strict'

  function math (a, ...rest) {
    return a + rest.reduce((a, b) => a * b, 1)
  }

  console.log(math(53, 61, 67))
})()
