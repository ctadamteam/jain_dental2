const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    'bottom: -60px; left: 5px; max-height: 115%; max-width: 50%; pointer-events: none; z-index: 10;" alt="T-Scan Device"',
    'bottom: -80px; left: 5px; max-height: 115%; max-width: 50%; pointer-events: none; z-index: 10;" alt="T-Scan Device"'
);

fs.writeFileSync('index.html', html);
console.log('T-Scan moved down');
