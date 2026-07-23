const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let lines = html.split('\n');
lines.forEach((line, i) => {
    if(line.includes('턱관절 물리치료') || line.includes('임플란트') || line.includes('section4')) {
        console.log(`${i+1}: ${line.trim()}`);
    }
});
