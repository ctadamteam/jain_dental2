const fs = require('fs');

// 1. Update HTML
let html = fs.readFileSync('index.html', 'utf8');

// Replace the wrapper block back to its original simpler form
const fullBlockMatch = /<div class="tmj-cta">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/;
if (fullBlockMatch.test(html)) {
    const matched = html.match(fullBlockMatch)[0];
    let newBlock = matched.replace(
        '<div class="container">\n                    <div style="max-width: 1000px; margin: 0 auto; width: 100%;">\n                        <div class="tmj-cta-content">',
        '<div class="container">\n                    <div class="tmj-cta-content">'
    );
    
    // Remove the extra closing div
    newBlock = newBlock.replace(
        '</div>\n                    </div>\n                </div>\n            </div>',
        '</div>\n                </div>\n            </div>'
    );
    
    html = html.replace(matched, newBlock);
    fs.writeFileSync('index.html', html);
    console.log('HTML wrapper removed');
} else {
    console.log('HTML block not found');
}

// 2. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace(
    '.tmj-cta-content { text-align: left; max-width: 450px; margin: 0; transform: none; }',
    '.tmj-cta-content { text-align: left; max-width: 450px; margin: 0 auto; transform: translateX(-500px); }'
);

fs.writeFileSync('css/style.css', css);
console.log('CSS updated');