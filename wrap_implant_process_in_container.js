const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    `</ul>\n                    </div> <!-- container 닫기 -->\n                    \n                    <div class="implant-process-section mt-60">`,
    `</ul>\n\n                    <div class="implant-process-section mt-60">`
);

html = html.replace(
    `</div>\n                    </div>\n                    \n                    <div class="container mt-80 pb-80">`,
    `</div>\n                    </div> <!-- container 닫기 -->\n                    \n                    <div class="container mt-80 pb-80">`
);

const newVersion = 'v=' + Date.now();
html = html.replace(/css\/style\.css\?v=[^"']+/g, 'css/style.css?' + newVersion);
fs.writeFileSync('index.html', html, 'utf8');

console.log('Wrapped implant-process-section inside container for Section 7 Tab 1!');
