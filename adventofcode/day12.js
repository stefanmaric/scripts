/*
 * Run in: http://adventofcode.com/day/12/input
 */

;(function () {
  let input = document.querySelector('pre').textContent

  console.log('Day12/first:', first(input))
  console.log('Day12/second:', second(input))

  function first (input) {
    return input.match(/-?\d+/g).reduce((a, b) => +a + +b)
  }

  function second (input) {
    return first(JSON.stringify(JSON.parse(input), replacer))
  }

  function replacer (key, val) {
    if (isObject(this[key]) && hasVal(this[key], 'red')) return
    return val
  }

  function hasVal (obj, val) {
    return Object.keys(obj).some(e => obj[e] === val)
  }

  function isObject (obj) {
    return (!!obj) && (obj.constructor === Object)
  }
}())
