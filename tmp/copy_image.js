const fs = require('fs');
const path = require('path');

const source = 'C:\\Users\\grace\\.gemini\\antigravity\\brain\\976224f1-f9df-41b8-be50-ff35a8d02d76\\media__1773059709426.jpg';
const dest = 'c:\\Users\\grace\\grace-isitua\\public\\grace-portrait.jpg';

try {
  fs.copyFileSync(source, dest);
  console.log('Successfully copied ' + source + ' to ' + dest);
} catch (err) {
  console.error('Error copying file:', err);
  process.exit(1);
}
