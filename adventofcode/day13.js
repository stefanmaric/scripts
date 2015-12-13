/*
 * Run in: http://adventofcode.com/day/13/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log('Day13/first:', first(input))
  console.log('Day13/second:', second(input))

  function first (input) {
    let pairs = getPairs(input)
    let persons = getPersons(pairs)
    let relations = getRelations(pairs)
    let permutations = permute(persons)

    return permutations.map(arrangement => {
      return calculateHappiness(arrangement, relations)
    }).sort((a, b) => b > a)[0]
  }

  function second (input) {
    let pairs = getPairs(input)
    let persons = getPersons(pairs)

    let relations = getRelations([...pairs, ...persons.reduce((a, person) => {
      a.push([ 'myself', person, 0 ])
      a.push([ person, 'myself', 0 ])
      return a
    }, [])])

    let permutations = permute([...persons, 'myself'])

    return permutations.map(arrangement => {
      return calculateHappiness(arrangement, relations)
    }).sort((a, b) => b > a)[0]
  }

  function getPairs (input) {
    const extractor = /(\w+) .*? (lose|gain) (\d+) .*? (\w+)\.$/
    return input.split('\n').map(l => l.match(extractor)).map(m => {
      return [ m[1], m[4], (m[2] === 'lose' ? -1 : 1) * +m[3] ]
    })
  }

  function getPersons (pairs) {
    return Array.from(pairs.reduce((a, b) => {
      return a.add(b[0]).add(b[1])
    }, new Set()))
  }

  function permute (arr) {
    return arr.length - 2 &&
      [].concat(...arr.map((el, i, arr) => {
        let cp = arr.slice()
        let cu = cp.splice(i, 1)
        return permute(cp).map(el => cu.concat(el))
      })) ||
      [ arr.slice(), arr.slice().reverse() ]
  }

  function getRelations (pairs, relations = {}) {
    return pairs.reduce((a, b) => {
      if (!a[b[0]]) a[b[0]] = {}
      a[b[0]][b[1]] = b[2]
      return a
    }, relations)
  }

  function calculateHappiness (arrangement, relations) {
    return arrangement.map((el, i, arr) => {
      return relations[el][arr[(i) ? i - 1 : arr.length - 1]] +
             relations[el][arr[(i + 1 === arr.length) ? 0 : i + 1]]
    }).reduce((a, b) => a + b)
  }
}())
