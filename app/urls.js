const electron = require('electron')
const fs = require('fs');

exports.getUrls = () => {
  // Add cleaning of comment lines so the setyp file can be
  // made more readable
  console.log("Open setup file ");
  data = fs.readFileSync('setup-urls.conf', 'utf8');
  //   if(err) throw err;
  return data.toString().split("\n");

}
