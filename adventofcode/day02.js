/*
 * Run in: http://adventofcode.com/day/2/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log('Day02/first:', first(input))
  console.log('Day02/second:', second(input))

  function first (input) {
    return input
      .split('\n')
      .map(l => l.split('x').map(i => +i))
      .map(el => {
        return [
          el[0] * el[1],
          el[0] * el[2],
          el[1] * el[2]
        ]
      })
      .reduce((a, b) => {
        return a +
          b.reduce((a, b) => a + b) * 2 +
          b.sort((a, b) => a > b)[0]
      }, 0)
  }

  function second (input) {
    return input
      .split('\n')
      .map(l => l.split('x').map(i => +i).sort((a, b) => a > b))
      .reduce((a, b) => {
        return a +
          b.slice(0, 2).reduce((a, b) => a + b) * 2 +
          b.reduce((a, b) => a * b)
      }, 0)
  }
}())
