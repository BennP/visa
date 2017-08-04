/**
 * @app-settings.js
 *
 * Provides saving of data between sessions
 *
 */
const settings = require('electron-settings');
const path = require('path');

const URL_PATH ='urlSetupPath';
const SWITCH_TIME = 'switchTime';

/**
 * Settinsg data
 * URL config file name and path
 * switch URL time in seconds
 */

exports.addDefault = function () {
  // Add the default data to settings
  let setupPath = path.join(process.env['HOME'],'.visa', 'setup-url.conf')
  console.log('Default setup path = ' + setupPath);
  settings.get( URL_PATH, setupPath);
  settings.get( SWITCH_TIME, 15);
}

exports.saveSetupPath = function (setupFilePath) {
  // Saves the URL setup file path

  settings.set(URL_PATH, setupFilePath).then(() => {
    settings.get(URL_PATH).then(val => {
      console.log('Save settings path = ' + val);
    });
  });
}

exports.getSetupPath = function () {
  // Get the Astro Path from persistant persistant
  console.log(settings.getSync(URL_PATH));
  return settings.getSync(URL_PATH);
}

exports.saveSwitchTime = function (switchTime) {
  // Saves the Switch time
  settings.set(SWITCH_TIME, switchTime).then(() => {
    settings.get(SWITCH_TIME).then(val => {
      console.log('Save settings switch = ' + val);
    });
  });
}

exports.getSwitchTime = function () {
  // Get the Switch Time

  return settings.getSync(SWITCH_TIME);
}