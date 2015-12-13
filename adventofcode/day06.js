/*
 * Run in: http://adventofcode.com/day/6/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log('Day06/first:', first(input))
  console.log('Day06/second:', second(input))

  function fillMatrix (matrix, fillWith, from, to) {
    let fn = (typeof fillWith === 'function') ? fillWith : () => fillWith

    from = from.split(',').map(el => +el)
    to = to.split(',').map(el => +el)

    for (let i = from[0]; i <= to[0]; i++) {
      for (let j = from[1]; j <= to[1]; j++) {
        matrix[i][j] = fn(matrix[i][j])
      }
    }

    return matrix
  }

  function first (input) {
    return input.split('\n')
      .map(l => l.match(/(on|off|toggle) (\d+,\d+) through (\d+,\d+)/).slice(1))
      .reduce((matrix, inst) => {
        let fillWith

        switch (inst[0]) {
          case 'on':
            fillWith = 1
            break
          case 'off':
            fillWith = 0
            break
          case 'toggle':
            fillWith = (val) => val ? 0 : 1
            break
        }

        return fillMatrix(matrix, fillWith, inst[1], inst[2])
      }, Array(1000).fill().map(() => Array(1000).fill(0)))
      .reduce((count, row) => count + row.filter(el => el).length, 0)
  }

  function second (input) {
    return input.split('\n')
      .map(l => l.match(/(on|off|toggle) (\d+,\d+) through (\d+,\d+)/).slice(1))
      .reduce((matrix, inst) => {
        let fillWith

        switch (inst[0]) {
          case 'on':
            fillWith = (val) => ++val
            break
          case 'off':
            fillWith = (val) => val ? --val : 0
            break
          case 'toggle':
            fillWith = (val) => val + 2
            break
        }

        return fillMatrix(matrix, fillWith, inst[1], inst[2])
      }, Array(1000).fill().map(() => Array(1000).fill(0)))
      .reduce((count, row) => count + row.reduce((a, b) => a + b), 0)
  }
}())
