/*
 * Run in: http://adventofcode.com/day/3/input
 */

;(function () {
  let input = document.querySelector('pre').textContent

  console.log('Day03/first:', first(input))
  console.log('Day03/second:', second(input))

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

    houses[`${coords.x},${coords.y}`] = houses[`${coords.x},${coords.y}`] + 1 || 1
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

  function second (input) {
    let result = input.split('').reduce((data, command, i) => {
      moveSanta(data[i % 2 ? 'robot' : 'santa'], data.houses, command)
      return data
    }, {
      santa: { x: 0, y: 0 }, robot: { x: 0, y: 0 }, houses: { '0,0': 2 }
    })

    return Object.keys(result.houses).length
  }
}())
