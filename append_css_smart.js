const fs = require('fs');

const raw = fs.readFileSync('failed_css_blocks.css', 'utf8');

// Regex to match "/* STEP 123 */" and the block that follows
const matches = [...raw.matchAll(/\/\* STEP (\d+) \*\/\s*([\s\S]*?)(?=\/\* STEP \d+ \*\/|$)/g)];

let desktopCss = '\n/* Re-applied Desktop CSS */\n';
let mobileCss = '\n/* Re-applied Mobile CSS */\n@media screen and (max-width: 768px) {\n';

matches.forEach(m => {
    const step = parseInt(m[1], 10);
    const code = m[2].trim();
    
    // Steps 694 and 697 were from the mobile optimization block
    if (step === 694 || step === 697) {
        mobileCss += code + '\n';
    } else {
        desktopCss += code + '\n';
    }
});

mobileCss += '}\n';

// Read the current style.css
let styleCss = fs.readFileSync('css/style.css', 'utf8');

// Append
fs.writeFileSync('css/style.css', styleCss + desktopCss + mobileCss);
console.log('Smart appended CSS!');
