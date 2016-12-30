/**
 * @app-settings.js
 *
 * Provides saving of data between sessions
 *
 */
const settings = require('electron-settings');
const path = require('path');

/**
 * Settinsg data
 * URL config file name and path
 * switch URL time in seconds
 */

exports.addDefault = function () {
  // Add the default data to settings
  let setupPath = path.join(process.env['HOME'],'.visa', 'setup-url.conf')
  console.log('Default setup path = ' + setupPath);
  settings.defaults({
    urlSetupPath: setupPath,
    switchTime: 15
  });
}

exports.saveSetupPath = function (setupFilePath) {
  // Saves the URL setup file path

  settings.set('urlSetupPath', setupFilePath).then(() => {
    settings.get('urlSetupPath').then(val => {
      console.log('Save settings path = ' + val);
    });
  });
}

exports.getSetupPath = function () {
  // Get the Astro Path from persistant persistant
  console.log(settings.getSync('urlSetupPath'));
  return settings.getSync('urlSetupPath');
}

exports.saveSwitchTime = function (switchTime) {
  // Saves the Switch time
  settings.set('switchTime', switchTime).then(() => {
    settings.get('switchTime').then(val => {
      console.log('Save settings switch = ' + val);
    });
  });
}

exports.getSwitchTime = function () {
  // Get the Switch Time

  return settings.getSync('switchTime');
}