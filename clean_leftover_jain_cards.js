const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const regexLeftover = /<\/div>\s*<div class="jain-card">[\s\S]*?<!-- TAB 2: 치아균열 치료 -->/;

const replacement = `</div>\n                    </div>\n                </div>\n\n                <!-- TAB 2: 치아균열 치료 -->`;

if (regexLeftover.test(html)) {
    html = html.replace(regexLeftover, replacement);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Cleaned leftover jain cards SUCCESS!');
} else {
    console.log('Regex match failed!');
}
