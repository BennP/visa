const remote = require('electron').remote
const main = remote.require('./main.js')

var secondTimeou = document.createElement('input')
secondTimeou.name = 'Seconds to Loop'
document.body.appendChild(secondTimeou)

var button = document.createElement('button')
button.textContent = 'Start'
button.addEventListener('click', () => {
  console.log('Seconds  =' + secondTimeou.value);
  main.openShowUrl(secondTimeou.value)
}, false)
document.body.appendChild(button)


var stepButton = document.createElement('button')
stepButton.textContent = 'One Step'
stepButton.addEventListener('click', () => {
  main.stepOneUrl()
}, false)
document.body.appendChild(stepButton)

