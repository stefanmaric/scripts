'use strict'

const net = require('net')
const PORT = process.argv[2] || 8001

net.createServer(connectionListener)
  .on('error', console.error)
  .listen(PORT)

function connectionListener (socket) {
  socket.write(formatDate(new Date()))
  socket.write('\n')
  socket.end()
}

function formatDate (date) {
  const YEAR = date.getFullYear()
  const MONTH = leftPad(date.getMonth() + 1, '0', 2)
  const DAY = leftPad(date.getDate(), '0', 2)
  const HOUR = leftPad(date.getHours(), '0', 2)
  const MINUTE = leftPad(date.getMinutes(), '0', 2)

  return `${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}`
}

function leftPad (input, char, n) {
  input = input.toString()
  return (n - input.length > 0)
    ? char.repeat(n - input.length) + input
    : input
}
