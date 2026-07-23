const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
console.log('tmj start:', lines.findIndex(l => l.includes('id="tmj"')));
console.log('clinic-tour start:', lines.findIndex(l => l.includes('id="clinic-tour"')));
