const { execSync } = require('child_process');
try {
  console.log('Installing framer-motion...');
  execSync('npm install framer-motion', { stdio: 'inherit' });
  console.log('Done.');
} catch (e) {
  console.error('Error installing:', e.message);
}
