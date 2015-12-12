/*
 * Run in: http://adventofcode.com/day/12/input
 */

;(function () {
  let input = document.querySelector('pre').textContent

  console.log(
    'Day12/first:',
    first(input)
  )

  function first (input) {
    return input.match(/-?\d+/g).reduce((a, b) => +a + +b)
  }
}())
