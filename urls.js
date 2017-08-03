const electron = require('electron')
const fs = require('fs');
const appSettings = require('./app-settings.js');

function createNewSettingsFile() {
  console.log('Url Settings file missing. Creating a new');

  let filePath = appSettings.getSetupPath();


  let emptyUrlSettings = '# Template file \n# This is a comment line\nhttp://www.google.com\nhttp://dilbert.com/\n';
  fs.writeFile(filePath, emptyUrlSettings , (err) => {
    if (err) throw err;
    console.log('It\'s created!');
  });
}

exports.getUrls = () => {
  // Add cleaning of comment lines so the setyp file can be
  // made more readable

  filePath = appSettings.getSetupPath();
  console.log('Open setup file ' + filePath);
  try {
    //data = fs.readFileSync('./app/setup-urls.conf', 'utf8');
    data = fs.readFileSync(filePath, 'utf8');
  }
  catch(err) {
    console.log('Error. Setings file ! ' + err.name + ' ' + err.message);
    // throw 'SetingsFileError';
    createNewSettingsFile();
  }
  tmpLines = data.toString().split("\n");
  let returnArray = [];

  tmpLines.forEach(function(element) {
    if (element[0] != '#') {
      returnArray .push(element);
    }
  });

  console.log( 'Cleaned array ' + returnArray);

  return returnArray;
}
