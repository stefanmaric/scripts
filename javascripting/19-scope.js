;(function () {
  'use strict'
  /* eslint-disable no-unused-vars */

  let a = 1
  let b = 2
  let c = 3

  ;(function firstFunction () {
    let b = 5
    let c = 6

    ;(function secondFunction () {
      let b = 8

      console.log('a: ' + a + ', b: ' + b + ', c: ' + c)

      ;(function thirdFunction () {
        let a = 7
        let c = 9

        ;(function fourthFunction () {
          let a = 1
          let c = 8
        })()
      })()
    })()
  })()
  /* eslint-enable no-unused-vars */
})()
