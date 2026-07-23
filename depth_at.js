const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let depth = 0;
let lines = html.split('\n');
for (let i = 0; i < 796; i++) {
    let openMatch = lines[i].match(/<div\b[^>]*>/g);
    let closeMatch = lines[i].match(/<\/div>/g);
    let open = openMatch ? openMatch.length : 0;
    let close = closeMatch ? closeMatch.length : 0;
    depth += open - close;
}
console.log('Depth at line 796:', depth);
