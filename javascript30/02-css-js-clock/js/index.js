;(function (window, document, React, ReactDOM) {
  'use strict'

  /**
   * A more accurate alternative to `window.setInterval` that does delay correction.
   *
   * @see: https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
   * @see: https://github.com/whatwg/html/issues/3151
   *
   * @param {Function} func A function to be executed every `delay` milliseconds.
   * @param {number} delay The time, in milliseconds, the timer should delay in between executions of the specified function.
   * @returns {Function} Deregistration function. Call it to cancel the interval.
   */
  const createInterval = (func, delay) => {
    const getNow = window.performace
      ? window.performance.now
      : Date.now
    const start = getNow()
    let nextTick = start
    let timeoutId

    function tick () {
      const now = getNow()
      nextTick = nextTick + delay
      func()
      timeoutId = window.setTimeout(tick, nextTick - now)
      return unregister
    }

    function unregister () {
      window.clearTimeout(timeoutId)
    }

    return tick()
  }

  /**
   * Create an inverval but delay first excecution until next multiple of `factor`
   *
   * @param {Function} func A function to be executed every `delay` milliseconds.
   * @param {number} delay The time, in milliseconds, the timer should delay in between executions of the specified function.
   * @param {number} factor Time, in miliseconds, to round-up the first excecution of `func`.
   *
   * @example
   * const MINUTE = 1000 * 60
   * const HOUR = MINUTE * 60
   * // Call every 5 minutes but don't start until the next hour starts, e.g. 2pm
   * let cancelInterval = createRoundedInterval(() => alert('HUE'), MINUTE * 15, HOUR)
   */
  const createRoundedInterval = (func, delay, factor) => {
    const now = Date.now()
    const nextTick = Math.ceil(now / factor) * factor
    let timeoutId
    let cancelInterval

    timeoutId = window.setTimeout(() => {
      cancelInterval = createInterval(func, delay)
    }, nextTick - now)

    function unregister () {
      window.clearTimeout(timeoutId)
      if (cancelInterval) cancelInterval()
    }

    return unregister
  }

  function AnalogClockHand ({ type, degrees }) {
    return React.createElement(
      'div',
      {
        className: [
          'hand',
          type
        ].join(' '),
        style: {
          transform: `rotate(${degrees}deg)`
        }
      }
    )
  }

  function Marks () {
    return Array(30).fill(true).map((el, i) => React.createElement(
      'span',
      {
        key: `mark-${i}`,
        className: 'mark' + (i % 5 ? '' : ' fifth'),
        style: {
          transform: `rotate(${180 / 30 * i}deg)`
        }
      }
    ))
  }

  class AnalogClock extends React.Component {
    constructor (props) {
      super(props)

      let now = new Date()

      this.state = {
        hourDegrees: 0,
        minuteDegrees: 0,
        secondDegrees: 0,
        today: new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        )
      }
    }

    getSecondDegrees (ms) {
      return Math.ceil(ms / 1000) / 60 * 360
    }

    getMinuteDegrees (ms) {
      return Math.ceil(ms / 1000 / 60) / 60 * 360
    }

    getHourDegrees (ms) {
      return Math.ceil(ms / 1000 / 60 / 60) / 12 * 360
    }

    tick () {
      const now = Date.now()
      const ms = Math.ceil((now - this.state.today) / 1000) * 1000
      const hourDegrees = this.getHourDegrees(ms)
      const minuteDegrees = this.getMinuteDegrees(ms)
      const secondDegrees = this.getSecondDegrees(ms)

      this.setState({
        hourDegrees,
        minuteDegrees,
        secondDegrees
      })
    }

    componentDidMount () {
      this.tick()

      this.clearInterval = createRoundedInterval(
        this.tick.bind(this),
        1000,
        1000
      )
    }

    componentWillUnmount () {
      this.clearInterval()
    }

    render () {
      return React.createElement(
        'div',
        {
          className: 'analog-clock'
        },
        React.createElement(
          AnalogClockHand,
          {
            type: 'hour',
            degrees: this.state.hourDegrees
          }
        ),
        React.createElement(
          AnalogClockHand,
          {
            type: 'minute',
            degrees: this.state.minuteDegrees
          }
        ),
        React.createElement(
          AnalogClockHand,
          {
            type: 'second',
            degrees: this.state.secondDegrees
          }
        ),
        Marks()
      )
    }
  }

  ReactDOM.render(
    React.createElement(AnalogClock),
    document.getElementById('app')
  )
}(this, this.document, this.React, this.ReactDOM))
