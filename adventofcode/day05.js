/*
 * Run in: http://adventofcode.com/day/5/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log('Day05/first:', first(input))
  console.log('Day05/second:', second(input))

  function testAll (input, rules) {
    return rules.every(regex => regex.test(input))
  }

  function first (input) {
    let rules = [
      /(.*[aeiou].*){3}/,
      /(\w)\1/,
      /^((?!(ab|cd|pq|xy)).)*$/
    ]

    return input.split('\n').filter(word => testAll(word, rules)).length
  }

  function second (input) {
    let rules = [
      /(\w{2}).*\1/,
      /(\w).\1/
    ]

    return input.split('\n').filter(word => testAll(word, rules)).length
  }
}())
