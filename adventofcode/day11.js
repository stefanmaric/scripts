/*
 * Run in: http://adventofcode.com/day/11
 */

;(function () {
  let input = document.querySelector('.puzzle-input').textContent

  console.log('Day11/first:', first(input))
  console.log('Day11/second:', second(input))

  function first (input) {
    while (!passwordCheck(input)) input = incrementAlpha(input)
    return input
  }

  function second (input) {
    return first(incrementAlpha(first(input)))
  }

  function passwordCheck (password) {
    let rules = [
      pwd => !/i|o|l/.test(pwd),
      pwd => /(\w)\1.*((?!\1).)\2/.test(pwd),
      pwd => pwd.split('').some((el, i, arr) => {
        return el.charCodeAt() === (arr[i + 1] && arr[i + 1].charCodeAt() - 1) &&
          el.charCodeAt() === (arr[i + 2] && arr[i + 2].charCodeAt() - 2)
      })
    ]

    return rules.every(rule => rule(password))
  }

  function incrementAlpha (input) {
    return hexavigesimalToAlpha((parseInt(alphaToHexavigesimal(input), 26) + 1).toString(26))
  }

  function alphaToHexavigesimal (s) {
    return s.match(/\w/g).map(el => (el.charCodeAt() - 97).toString(26)).join('')
  }

  function hexavigesimalToAlpha (s) {
    return s.match(/\w/g).map(el => String.fromCharCode(parseInt(el, 26) + 97)).join('')
  }
}())
