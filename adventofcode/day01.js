/*
 * Run in: http://adventofcode.com/day/1/input
 */

;(function () {
  let input = document.querySelector('pre').textContent

  console.log('Day01/first:', first(input))
  console.log('Day01/second:', second(input))

  function first (input) {
    return input.match(/\(/g).length - input.match(/\)/g).length
  }

  function second (input) {
    let i = 0
    input = input.split('')

    for (let floor = 0; floor !== -1; i++) {
      floor += (input[i] === '(') ? 1 : -1
    }

    return i
  }
}())
