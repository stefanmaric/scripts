/*
 * Run in: http://adventofcode.com/day/4
 *
 * Depending on your machine, browser will complain about
 * about taking to long to get second answer
 */

;(function () {
  /* global md5 */
  let input = document.querySelector('.puzzle-input').textContent
  let md5Url = 'https://raw.githubusercontent.com/AndreasPizsa/md5-jkmyers/master/md5.min.js'

  getScript(md5Url, function () {
    console.log(
      'Day04/first:',
      first(input)
    )
  })

  function getScript (url, callback) {
    let script = document.createElement('script')

    script.type = 'text/javascript'
    script.async = 'true'
    script.src = url
    script.onload = callback

    document.head.appendChild(script)
  }

  function first (input) {
    return getFirstMatch(input, /^0{5}/)
  }

  function getFirstMatch (secret, regex) {
    let i = 0
    while (!regex.test(md5(secret + i))) i++
    return i
  }
}())
