// ****************
// Aplication Visa
//
// Todo:
//      - Add so the configuration time for each page is in the setup-urls.conf file
//      - The time from auxilary screen is a default time if no time is given on individual Url
//      - Let the user give a directory where he whants the settings file to exists
//      -- And name the settings file to
// ****************


const electron = require('electron')
const app = electron.app
const exec = require('child_process').exec;
const {
  BrowserWindow
} = require('electron')
const urls = require('./urls.js')
const app_settings = require('./app-settings.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let firstWindow
let secondWindow
let urlWindow = null;
let urlId = 0;
let showFirst = true;

let urlArray = [];

let currentUrlIndex = 0;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    if (firstWindow != null) {
      firstWindow.destroy();
    }
    if (secondWindow != null) {
      secondWindow.destroy();
    }
    mainWindow = null
  })
}

function createFirstWindow() {
  // Create browser window first.
  firstWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    fullscreen: false,
    show: false,
    frame: false,
    allowRunningInsecureContent: true,
    allowDisplayingInsecureContent: true,
    webContents: {
      partition: 'persist:slider'
    }
  })

  firstWindow.loadURL(`file://${__dirname}/images/moon.jpg`);

  // Emitted when the window is closed.
  firstWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    firstWindow = null
  })
}

function createSecondWindow() {
  // Create browser window first.
  secondWindow = new BrowserWindow({
      width: 800,
      height: 600,
      fullscreen: false,
      show: false,
      frame: false,
      allowRunningInsecureContent: true,
      allowDisplayingInsecureContent: true,
      webContents: {
        partition: 'persist:slider'
      }
    })

  secondWindow.loadURL(`file://${__dirname}/images/mars.jpg`);

  // Emitted when the window is closed.
  secondWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    secondWindow = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow();
  createFirstWindow();
  createSecondWindow();
  app_settings.addDefault();
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function startTimer(timeToSleep) {

  setInterval(timerExpierd, timeToSleep);

}

function timerExpierd() {
  console.log('Timer expierd');
  console.log('current Index before = ' + currentUrlIndex.toString());
  if (currentUrlIndex > urlArray.length - 1) {
    currentUrlIndex = 0;
  }

  console.log('current Index to show = ' + currentUrlIndex.toString());

  // Show the already loaded window and then update the next to be shown
  if (showFirst) {
    console.log('Show first ');
    firstWindow.show();
    // secondWindow.hide();
    console.log('Load second with = ' + urlArray[currentUrlIndex]);
    secondWindow.loadURL(urlArray[currentUrlIndex]);
    showFirst = false;
  } else {
    console.log('Show second ');
    secondWindow.show();
    // firstWindow.hide();
    console.log('Load first with = ' + urlArray[currentUrlIndex]);
    firstWindow.loadURL(urlArray[currentUrlIndex]);
    showFirst = true;
  }
  currentUrlIndex = currentUrlIndex + 1;
}


exports.openShowUrl = (secTimer) => {

  mainWindow.minimize()
  if (secTimer < 3) {
    secTimer = 3;
  }
  console.log('Before get urls')
  urlArray = urls.getUrls();
  // console.log('global Urls = ' + urlArray[0])

  console.log('Before start timer')
  timerExpierd();
  startTimer(secTimer * 1000);
  firstWindow.setFullScreen(true);
  secondWindow.setFullScreen(true);
}


exports.reloadUrls = () => {

  console.log('Reload Urls from settings file')
  urlArray = urls.getUrls();
}

exports.stepOneUrl = () => {

  if (urlArray.length < 1) {
    urlArray = urls.getUrls();
  }
  timerExpierd()
}