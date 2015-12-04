/*
 * Run in: http://adventofcode.com/day/3/input
 */

;(function () {
  let input = document.querySelector('pre').textContent

  console.log(
    'Day03/first:',
    first(input)
  )

  function moveSanta (coords, houses, command) {
    switch (command) {
      case '^':
        coords.y++
        break
      case 'v':
        coords.y--
        break
      case '>':
        coords.x++
        break
      case '<':
        coords.x--
        break
    }

    houses[coords.x + ',' + coords.y] = houses[coords.x + ',' + coords.y] + 1 || 1
  }

  function first (input) {
    let result = input.split('').reduce((data, command) => {
      moveSanta(data.coords, data.houses, command)
      return data
    }, {
      coords: { x: 0, y: 0 }, houses: { '0,0': 1 }
    })

    return Object.keys(result.houses).length
  }
}())