/*
 * Run in: http://adventofcode.com/day/10
 */

;(function () {
  let input = document.querySelector('.puzzle-input').textContent

  console.log(
    'Day09/first:',
    first(input)
  )

  function first (input) {
    return Array(40).fill().reduce(lookAndSay, input).length
  }

  function lookAndSay (input) {
    let ex = /(\d)\1*/g
    return input.match(ex).map(el => el.length + el[0]).join('')
  }
}())
