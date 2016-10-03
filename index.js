const remote = require('electron').remote
const main = remote.require('./main.js')

var textUrl = document.createElement('input')
textUrl.name = 'Url'
document.body.appendChild(textUrl)

var button = document.createElement('button')
button.textContent = 'Start Seq'
button.addEventListener('click', () => {
  console.log('textUrl contains =' + textUrl);
  main.openShowUrl()
}, false)
document.body.appendChild(button)
