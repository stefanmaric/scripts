/*
 * Run in: http://adventofcode.com/day/8/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log(
    'Day08/first:',
    first(input)
  )

  function first (input) {
    let original = input.split('\n').join('')

    let evaluated = input.split('\n').map(s => eval(s)).join('')

    return original.length - evaluated.length
  }
}())
