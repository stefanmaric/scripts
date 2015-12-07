/*
 * Run in: http://adventofcode.com/day/7/input
 */

;(function () {
  let input = document.querySelector('pre').textContent.slice(0, -1)

  console.log(
    'Day07/first:',
    first(input)
  )

  function first (input, wires = {}) {
    /*
     *    /^([\da-z]+)? ?(?:([A-Z]+) ([\da-z]+) )?-> ([a-z]+)$/
     * --------------------------------------------------------
     *     word or digit     WORD    word or digit     word
     * --------------------------------------------------------
     *     inputA            op      inputB            wire
     * --------------------------------------------------------
     *     4210                                   ->   bb
     * --------------------------------------------------------
     *     kr                AND     fv           ->   ba
     * --------------------------------------------------------
     *     54                OR      kr           ->   bc
     * --------------------------------------------------------
     *                       NOT     fv           ->   bd
     */

    let extractor = /^([\da-z]+)? ?(?:([A-Z]+) ([\da-z]+) )?-> ([a-z]+)$/

    let gates = {
      'AND': (a, b) => a & b,
      'OR': (a, b) => a | b,
      'NOT': (a, b) => b ^ 65535,
      'LSHIFT': (a, b) => a << b,
      'RSHIFT': (a, b) => a >> b
    }

    let lines = input.split('\n').map(el => el.match(extractor))

    function getVal (val) {
      // If a name of wire with already known value, return its value
      // If a number, return that number
      // Return `null` otherwise
      return wires.hasOwnProperty(val) ? wires[val] : isNaN(+val) ? null : +val
    }

    function connect (justIgnoreIt, inputA, gate, inputB, wire) {
      // Try to get input values
      inputA = getVal(inputA)
      inputB = getVal(inputB)

      // Do not overwrite wire values, since
      // a wire cannot have 2 sources
      if (getVal(wire) != null) return getVal(wire)

      // Wire connected directly to value
      // 4210 -> bb
      // bb   -> ca
      if (!gate && inputA != null) return (wires[wire] = inputA)

      // Wire connected to a gate
      if (gate && (inputA != null || gate === 'NOT') && inputB != null) {
        return (wires[wire] = gates[gate](inputA, inputB))
      }

      // Do not connect if input values are not known yet
      return null
    }

    while (lines.length) {
      let i = lines.shift()
      if (connect.apply(null, i) == null) lines.push(i)
    }

    // Puzzle asks for value of `a`
    return wires.a
  }
}())
