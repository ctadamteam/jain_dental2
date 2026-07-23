const html = require('fs').readFileSync('index.html', 'utf8'); console.log('S8:', html.split('id=\"tmj\"').length - 1); console.log('S9:', html.split('id=\"tour\"').length - 1);
