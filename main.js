const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const exec = require('child_process').exec;
const {BrowserWindow} = require('electron')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let firstWindow
let secondWindow
let urlWindow = null;
let urlId = 0;
let showFirst = true;

var urlArray = ['http://www.google.com',
                'https://inbox.google.com/',
                'https://photos.google.com/',
                'file:///home/benn/Pictures/christmas2015fullmoon.jpg',
                'http://dilbert.com/',
                'http://www.smhi.se/vadret/vadret-i-sverige/land/fiveDaysForecast.do?geonameid=2674649&redirect=false',
                'https://calendar.google.com/calendar/render?pli=1#main_7'];

var maxUrlIndex = urlArray.length;
var currentUrlIndex = 2;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 400, height: 200})

  // and load the index.html of the app.
  // mainWindow.loadURL(`http://www.google.com`)
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    if ( firstWindow != null ) {
      firstWindow.destroy();
    }
    if ( secondWindow != null ) {
      secondWindow.destroy();
    }
    mainWindow = null
  })
}

function createFirstWindow () {
  // Create browser window first.
  firstWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    show: false,
    fullscreen: true,
    show: false,
    frame: false,
    allowRunningInsecureContent: true,
    allowDisplayingInsecureContent: true,
    webContents:{
      partition: 'persist:slider'
    }
  })

  firstWindow.loadURL(urlArray[0])

  // Emitted when the window is closed.
  firstWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    firstWindow = null
  })
}

function createSecondWindow () {
  // Create browser window first.
  secondWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    fullscreen: true,
    show: false,
    frame: false,
    allowRunningInsecureContent: true,
    allowDisplayingInsecureContent: true,
    webContents:{
      partition: 'persist:slider'
    }
  })
//     type: desktop

  secondWindow.loadURL(urlArray[1])

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
app.on('ready',  function () {
  createWindow();
  createFirstWindow();
  createSecondWindow();
  createWindow();
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

function startTimer( timeToSleep ) {

  setInterval(timerExpierd, timeToSleep);

  /*
  var sleepString = 'sleep ' + 
  exec('sleep', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  */
}

function timerExpierd () {
  console.log('Timer expierd');
  console.log('current Index before = ' + currentUrlIndex.toString() );
  if ( currentUrlIndex > urlArray.length -1 )  {
    currentUrlIndex = 0;
  }

  console.log('current Index to show = ' + currentUrlIndex.toString() );

  // Show the already loaded window and then update the next to be shown
  if ( showFirst ) {
    console.log('Show first ');
    firstWindow.show();
    // secondWindow.hide();
    console.log('Load second with = ' + urlArray[currentUrlIndex ] );
    secondWindow.loadURL(urlArray[currentUrlIndex]);
    showFirst = false;
  } else {
    console.log('Show second ');
    secondWindow.show();
    // firstWindow.hide();
    console.log('Load first with = ' + urlArray[currentUrlIndex ] );
    firstWindow.loadURL(urlArray[currentUrlIndex]);
    showFirst = true;
  }
  currentUrlIndex = currentUrlIndex + 1;
}


exports.openShowUrl = ( secTimer) => {

  /*
  if ( urlWindow == null)
  {
    urlWindow = new BrowserWindow({width:800, height:600})
  }
  if (urlId == 0 )
  {
    urlWindow.loadURL('http://www.google.com')
    urlId = urlId + 1;
  }
  else {
    urlWindow.loadURL('http://www.smhi.se')
  }
  */
  mainWindow.minimize()
  if (secTimer < 3 ) {
    secTimer = 3;
  }
  startTimer( secTimer * 1000);
}


exports.stepOneUrl = ( ) => {

  timerExpierd()
}
