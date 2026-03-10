const fs = require('fs');
const source = 'C:\\Users\\grace\\.gemini\\antigravity\\brain\\3bbcd55f-e5ef-4860-a1a1-f39fa5487e34\\media__1773062135482.jpg';
const dest = 'c:\\Users\\grace\\grace-isitua\\public\\grace-portrait.jpg';

try {
    fs.copyFileSync(source, dest);
    console.log('Success');
} catch (e) {
    console.error(e);
    process.exit(1);
}
