const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('css/style.css', 'utf8');

console.log('=== SEARCHING FOR POTENTIAL VERTICAL TEXT CAUSES ===');

// 1. Search for word-break: break-all or writing-mode
const wordBreak = css.match(/[^{]+\{[^}]*word-break:[^}]*\}/g) || [];
console.log('Word break rules in CSS:');
wordBreak.forEach(w => console.log(w.slice(0, 100)));

// 2. Search for inline flex or fixed width containers with text
const flexInlines = [...html.matchAll(/<([a-z0-9]+)[^>]*style="[^"]*(display:\s*flex|width:\s*\d+px)[^"]*"[^>]*>([\s\S]*?)(?=<\/\1>)/gi)];
console.log(`\nFound ${flexInlines.length} inline flex/width text blocks. Checking inner text lengths:`);

flexInlines.forEach((m, idx) => {
    const tag = m[1];
    const fullTag = m[0].slice(0, 100);
    const innerText = m[3].replace(/<[^>]+>/g, '').trim();
    if (innerText.length > 10 && innerText.length < 200) {
        console.log(`[Spot ${idx+1}] <${tag}> Style: ${fullTag}`);
        console.log(`   Text snippet: "${innerText.slice(0, 60)}..."\n`);
    }
});
