const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace button container styles
html = html.replace(
    '<div style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 256px;">',
    '<div style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 205px;">'
);

// Replace first button
html = html.replace(
    '<a href="#" style="display: block; width: 100%; text-align: center; background: #ffffff; color: #0b2559; font-size: 18px; font-weight: 800; padding: 14px 0; border-radius: 4px; text-decoration: none;">',
    '<a href="#" style="display: block; width: 100%; text-align: center; background: #ffffff; color: #0b2559; font-size: 15px; font-weight: 800; padding: 11px 0; border-radius: 4px; text-decoration: none;">'
);

// Replace second button
html = html.replace(
    '<a href="tel:063-715-2875" style="display: block; width: 100%; text-align: center; background: #C69D5D; color: #ffffff; font-size: 18px; font-weight: 800; padding: 14px 0; border-radius: 4px; text-decoration: none;">',
    '<a href="tel:063-715-2875" style="display: block; width: 100%; text-align: center; background: #C69D5D; color: #ffffff; font-size: 15px; font-weight: 800; padding: 11px 0; border-radius: 4px; text-decoration: none;">'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done scaling down buttons by another 20%');
