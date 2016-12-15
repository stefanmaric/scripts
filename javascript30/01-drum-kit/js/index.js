;(function (window) {
  'use strict'
  window.addEventListener('load', function onWindowLoad () {
    const audioContext = new window.AudioContext()
    const audioAnalyser = audioContext.createAnalyser()
    const audioFiles = [
      { name: 'boom', src: 'sounds/boom.wav' },
      { name: 'clap', src: 'sounds/clap.wav' },
      { name: 'hihat', src: 'sounds/hihat.wav' },
      { name: 'kick', src: 'sounds/kick.wav' },
      { name: 'openhat', src: 'sounds/openhat.wav' },
      { name: 'ride', src: 'sounds/ride.wav' },
      { name: 'snare', src: 'sounds/snare.wav' },
      { name: 'tink', src: 'sounds/tink.wav' },
      { name: 'tom', src: 'sounds/tom.wav' }
    ]
    const keys = [...document.querySelectorAll('.key[data-key]')]
    const canvas = document.querySelector('#visualization')
    const canvasContext = canvas.getContext('2d')

    // To start, fetch all the audio resources at once.
    Promise.all(audioFiles.map(audioFile => window.fetch(audioFile.src)))
      // Each fetch's response includes an #arrayBuffer method that returns a promise
      // https://developer.mozilla.org/en-US/docs/Web/API/Body/arrayBuffer
      .then(responses => Promise.all(responses.map(res => res.arrayBuffer())))
      // AudioContext#decodeAudioData takes an ArrayBuffer and returns a promise
      // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/decodeAudioData
      .then(arrayBuffers => Promise.all(arrayBuffers.map(buffer => audioContext.decodeAudioData(buffer))))
      .then(init)
      .catch(err => console.error(err))

    function init (audioBuffers) {
      // Promise.all returns results in order, so match it with our files array.
      audioBuffers.forEach((buffer, i) => { audioFiles[i].buffer = buffer })

      keys.forEach(key => key.addEventListener('click', clickHandler))
      window.addEventListener('keydown', keydownHandler)

      startVisualization()
    }

    function animateKey (element, className) {
      element.classList.add(className)

      // Adding clases to an element can trigger different transitions to its
      // pseudo-elements, so count all transition properties that affect the
      // element and its pseudo-elements.
      let longestTransition = [null, '::before', '::after'].map(type => window
          .getComputedStyle(element, type)
          .getPropertyValue('transition-duration')
          .split(',')
          // It seems browsers retruns transition-duration properties in seconds.
          .map(s => +s.replace(/[^\d.]/g, ''))
        )
        // Aggregate transition-duration properties.
        .reduce((a, b) => a.concat(b), [])
        // Sort them by duration (in seconds).
        .sort((a, b) => a - b)
        // Retrieve the biggest one.
        .pop()

      return setTimeout(function () {
        // Remove class when all transitions are expected to end
        element.classList.remove(className)
      }, longestTransition * 1000)
    }

    function clickHandler (e) {
      let targetFile = audioFiles.find(audioFile => audioFile.name === e.target.dataset.sound)
      if (!targetFile) return
      playBuffer(targetFile.buffer)
      if (targetFile.timeoutId) window.clearTimeout(targetFile.timeoutId)
      targetFile.timeoutId = animateKey(e.target, 'active')
    }

    function keydownHandler (e) {
      let targetKey = keys.find(key => key.dataset.key === e.key.toLowerCase())
      if (!targetKey) return
      let targetFile = audioFiles.find(audioFile => audioFile.name === targetKey.dataset.sound)
      if (!targetFile) return
      playBuffer(targetFile.buffer)
      if (targetFile.timeoutId) window.clearTimeout(targetFile.timeoutId)
      targetFile.timeoutId = animateKey(targetKey, 'active')
    }

    // This function is heavily based on this:
    // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js
    function startVisualization () {
      let bufferLength = audioAnalyser.fftSize
      let dataArray = new Uint8Array(bufferLength)

      drawCanvas()

      function drawCanvas () {
        // Loop
        window.requestAnimationFrame(drawCanvas)

        audioAnalyser.getByteTimeDomainData(dataArray)

        // Blank the canvas
        canvasContext.clearRect(0, 0, canvas.width, canvas.height)

        // Sine line
        canvasContext.lineWidth = 1
        canvasContext.strokeStyle = 'rgb(255, 255, 255)'

        canvasContext.beginPath()

        let sliceWidth = canvas.width * 1.0 / bufferLength
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0
          let y = v * canvas.height / 2

          if (i === 0) {
            canvasContext.moveTo(x, y)
          } else {
            canvasContext.lineTo(x, y)
          }

          x += sliceWidth
        }

        canvasContext.lineTo(canvas.width, canvas.height / 2)
        canvasContext.stroke()
      }
    }

    function playBuffer (buffer, time) {
      let source = audioContext.createBufferSource()
      source.buffer = buffer
      source.connect(audioAnalyser)
      audioAnalyser.connect(audioContext.destination)
      source.start(time)
    }
  }, false)
}(this))
