const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace max-width of wrapper
html = html.replace(
    '<div style="width: 100%; max-width: 450px; margin-left: calc(5% + 400px);">',
    '<div style="width: 100%; max-width: 360px; margin-left: calc(5% + 400px);">'
);

// Replace h3 styles
html = html.replace(
    '<h3 style="color: #fff; font-size: 34px; font-weight: 700; line-height: 1.4; margin-bottom: 30px; text-align: left; letter-spacing: -0.5px;">',
    '<h3 style="color: #fff; font-size: 27px; font-weight: 700; line-height: 1.4; margin-bottom: 24px; text-align: left; letter-spacing: -0.5px;">'
);

// Replace button container styles
html = html.replace(
    '<div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 320px;">',
    '<div style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 256px;">'
);

// Replace first button
html = html.replace(
    '<a href="#" style="display: block; width: 100%; text-align: center; background: #ffffff; color: #0b2559; font-size: 22px; font-weight: 800; padding: 18px 0; border-radius: 4px; text-decoration: none;">',
    '<a href="#" style="display: block; width: 100%; text-align: center; background: #ffffff; color: #0b2559; font-size: 18px; font-weight: 800; padding: 14px 0; border-radius: 4px; text-decoration: none;">'
);

// Replace second button
html = html.replace(
    '<a href="tel:063-715-2875" style="display: block; width: 100%; text-align: center; background: #C69D5D; color: #ffffff; font-size: 22px; font-weight: 800; padding: 18px 0; border-radius: 4px; text-decoration: none;">',
    '<a href="tel:063-715-2875" style="display: block; width: 100%; text-align: center; background: #C69D5D; color: #ffffff; font-size: 18px; font-weight: 800; padding: 14px 0; border-radius: 4px; text-decoration: none;">'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done scaling down banner contents by 20%');
