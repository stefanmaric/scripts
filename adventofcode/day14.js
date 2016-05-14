/*
 * Run in: http://adventofcode.com/day/14/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log('Day14/first:', first(input))
  console.log('Day14/second:', second(input))

  function first (input) {
    return getReindeers(input)
      .map(el => calculateDistance(...el.slice(1).map(el => +el), 2503))
      .sort((a, b) => a > b)
      .pop()
  }

  function second (input) {
    let reindeers = getReindeers(input)
    let leaderboard = Array(2502).fill().reduce((data, b, sec, arr) => {
      let distances = reindeers.map(r => {
        return [
          r[0],
          calculateDistance(...r.slice(1).map(el => +el), sec + 1)
        ]
      })
      getWinners(distances).forEach(el => data[el] = data[el] + 1 || 1)
      return data
    }, {})
    return Object.keys(leaderboard).map(name => {
      return [ name, leaderboard[name] ]
    }).sort((a, b) => b[1] > a[1])[0].join(': ')
  }

  function getReindeers (input) {
    const extractor = /(\w+) .*? (\d+) .*? (\d+) .*? (\d+)/
    return input.split('\n').map(l => l.match(extractor).slice(1))
  }

  function calculateDistance (speed, sprintLength, restTime, timeElapsed) {
    let fullCycles = Math.trunc(timeElapsed / (sprintLength + restTime))
    let extraSec = timeElapsed % (sprintLength + restTime)
    return (fullCycles * sprintLength * speed) + (Math.min(extraSec, sprintLength) * speed)
  }

  function getWinners (distances) {
    let top = Math.max(...distances.map(el => el[1]))
    return distances.filter(el => el[1] === top).map(el => el[0])
  }
}())
