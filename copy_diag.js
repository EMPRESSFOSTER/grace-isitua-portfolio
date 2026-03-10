const fs = require('fs');
const source = 'C:\\Users\\grace\\.gemini\\antigravity\\brain\\976224f1-f9df-41b8-be50-ff35a8d02d76\\media__1773059709426.jpg';
const dest = 'c:\\Users\\grace\\grace-isitua\\public\\grace-portrait.jpg';

try {
    if (!fs.existsSync(source)) {
        console.error('Source file does not exist at: ' + source);
        process.exit(1);
    }
    fs.copyFileSync(source, dest);
    console.log('Success: Copied to ' + dest);
    const stats = fs.statSync(dest);
    console.log('Destination file size: ' + stats.size);
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}
