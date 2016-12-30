const remote = require('electron').remote
const main = remote.require('./main.js')
const urls = require('./urls.js')

let secondTimeou = document.createElement('input')
secondTimeou.name = 'Seconds to Loop'
document.body.appendChild(secondTimeou)

let button = document.createElement('button')
button.textContent = 'Start'
button.addEventListener('click', () => {
  console.log('Seconds  =' + secondTimeou.value);
  main.openShowUrl(secondTimeou.value)
}, false)
document.body.appendChild(button)


let stepButton = document.createElement('button')
stepButton.textContent = 'One Step'
stepButton.addEventListener('click', () => {
  main.stepOneUrl()
}, false)
document.body.appendChild(stepButton)

let loadUrlButton = document.createElement('button')
loadUrlButton.textContent = 'Test Load URL'
loadUrlButton.addEventListener('click', () => {
  let urlArr = urls.getUrls();
}, false)
document.body.appendChild(loadUrlButton)
