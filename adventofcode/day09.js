/*
 * Run in: http://adventofcode.com/day/9/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log('Day09/first:', first(input))
  console.log('Day09/second:', second(input))

  function first (input) {
    return getRouteDistances(input)[0]
  }

  function second (input) {
    return getRouteDistances(input).pop()
  }

  function getRouteDistances (input) {
    let extractor = /(\w+) to (\w+) = (\d+)/
    let distances = input.split('\n').map(l => l.match(extractor))

    let destinies = Array.from(distances.reduce((a, b) => {
      return a.add(b[1]).add(b[2])
    }, new Set()))

    let permutations = permute(destinies)

    distances = distances.reduce((a, b) => {
      a[b[1] + ',' + b[2]] = +b[3]
      return a
    }, {})

    return permutations.map(el => {
      return el.reduce((a, b, i, arr) => {
        return a + (
          distances[b + ',' + arr[i + 1]] ||
          distances[arr[i + 1] + ',' + b] ||
          0)
      }, 0)
    }).sort((a, b) => a > b)
  }

  function permute (arr) {
    return arr.length <= 2
      ? [ arr.slice(), arr.slice().reverse() ]
      : arr.map((el, i, arr) => {
        let cp = arr.slice()
        let cu = cp.splice(i, 1)
        return permute(cp).map(el => el.concat(cu))
      }).reduce((a, b) => a.concat(b), [])
  }
}())
