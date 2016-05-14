/*
 * Run in: http://adventofcode.com/day/15/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log('Day15/first:', first(input))
  console.log('Day15/second:', second(input))

  function first (input) {
    return extractIngredientList(input)
  }

  function second (input) {
    return input
  }

  function generateDistributions (resource, parts, result) {

  }

  function extractIngredientList (input) {
    const extractor = /-?\d+/g
    return input.split('\n').map(l => l.match(extractor).map(n => +n))
  }
}())
