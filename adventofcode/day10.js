/*
 * Run in: http://adventofcode.com/day/10
 */

;(function () {
  let input = document.querySelector('.puzzle-input').textContent

  console.log(
    'Day10/first:',
    first(input)
  )

  console.log(
    'Day10/second:',
    second(input)
  )

  function first (input) {
    return Array(40).fill().reduce(lookAndSay, input).length
  }

  function second (input) {
    return Array(50).fill().reduce(lookAndSay, input).length
  }

  function lookAndSay (input) {
    let ex = /(\d)\1*/g
    return input.match(ex).map(el => el.length + el[0]).join('')
  }
}())
