const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The section string to look for: <section id="tmj"
// Let's find the FIRST occurrence of "<!-- 8. 턱관절 진료 -->"
const s8Start = html.indexOf('<!-- 8. 턱관절 진료 -->');
// And the start of Section 10 (since 9 was replaced/missing) or "<!-- 10. 자인치과 둘러보기 -->"
// Actually earlier I checked and S9 `tour` was missing. Let's find "<!-- 11. 진료안내/오시는길 -->"
const s11Start = html.indexOf('<!-- 11. 진료안내/오시는길 -->');

if (s8Start !== -1 && s11Start !== -1) {
    console.log('S8 Start:', s8Start);
    console.log('S11 Start:', s11Start);
    // Let's write the corrupted middle part to a temp file to analyze
    fs.writeFileSync('corrupted_middle.html', html.substring(s8Start, s11Start));
}
