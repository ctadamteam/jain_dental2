const fs = require('fs');

['download.js', 'fetch_figma.js', 'fetch_figma2.js', 'fetch_figma3.js'].forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/figd_[a-zA-Z0-9_-]+/g, 'REDACTED_FIGMA_TOKEN');
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('Sanitized figma tokens in local dev scripts.');
