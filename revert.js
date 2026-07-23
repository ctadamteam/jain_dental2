const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

let startIdx = html.indexOf('<!-- 8. 치아보존/잇몸보존 -->');
let endIdx = html.indexOf('<!-- 9.');
if (startIdx !== -1 && endIdx !== -1) {
    let sectionHTML = html.substring(startIdx, endIdx);

    // Revert hero images
    sectionHTML = sectionHTML.replace(/<div class="con-hero-img" style="background: url\('image\/jain_section8_[^>]*><\/div>/g, '<div class="con-hero-img" style="background:#ddd;"></div>');
    
    // Revert method grid images
    sectionHTML = sectionHTML.replace(/<div class="method-img" style="background: url\('image\/jain_section8_[^>]*><\/div>/g, '<div class="method-img" style="background:#ddd;"></div>');
    
    // Revert ba images
    sectionHTML = sectionHTML.replace(/<div class="ba-img" style="background: url\('image\/jain_section8_[^>]*><\/div>/g, '<div class="ba-img" style="background:#ddd;"></div>');

    // Remove added img tags for tab 3
    sectionHTML = sectionHTML.replace(/<img src="image\/jain_section8_3_2\.png"[^>]*>/g, '<div class="method-img" style="background:#ddd; width:100%; max-width:1000px; height:300px; margin:0 auto 40px; border-radius:10px;"></div>');
    sectionHTML = sectionHTML.replace(/<img src="image\/jain_section8_3_3\.png"[^>]*>/g, '<div class="method-img" style="background:#ddd; width:100%; max-width:1000px; height:300px; margin:0 auto 40px; border-radius:10px;"></div>');

    // I previously removed `<div class="method-img"></div>` and `<div class="jc-img"></div>` in apply_1_2.js
    // Let's restore them.
    // For '시린이 예방 습관' and '자인치과 시린이 치료'
    sectionHTML = sectionHTML.replace(/<div class="method-title bg-blue">이를 깨무는/g, '<div class="method-img" style="background:#ddd;"></div>\n                                <div class="method-title bg-blue">이를 깨무는');
    sectionHTML = sectionHTML.replace(/<div class="method-title bg-gold">딱딱한 음식/g, '<div class="method-img" style="background:#ddd;"></div>\n                                <div class="method-title bg-gold">딱딱한 음식');
    sectionHTML = sectionHTML.replace(/<div class="method-title bg-blue">필요 시/g, '<div class="method-img" style="background:#ddd;"></div>\n                                <div class="method-title bg-blue">필요 시');
    sectionHTML = sectionHTML.replace(/<div class="method-title bg-gold">저마모 치약/g, '<div class="method-img" style="background:#ddd;"></div>\n                                <div class="method-title bg-gold">저마모 치약');
    
    sectionHTML = sectionHTML.replace(/<div class="jc-text">\s*<h5>디지털 장비/g, '<div class="jc-img" style="background:#ddd;"></div>\n                                <div class="jc-text">\n                                    <h5>디지털 장비');
    sectionHTML = sectionHTML.replace(/<div class="jc-text">\s*<h5>시린 증상에/g, '<div class="jc-img" style="background:#ddd;"></div>\n                                <div class="jc-text">\n                                    <h5>시린 증상에');
    sectionHTML = sectionHTML.replace(/<div class="jc-text">\s*<h5>불필요한 치료/g, '<div class="jc-img" style="background:#ddd;"></div>\n                                <div class="jc-text">\n                                    <h5>불필요한 치료');
    sectionHTML = sectionHTML.replace(/<div class="jc-text">\s*<h5>치료 후 관리/g, '<div class="jc-img" style="background:#ddd;"></div>\n                                <div class="jc-text">\n                                    <h5>치료 후 관리');

    html = html.substring(0, startIdx) + sectionHTML + html.substring(endIdx);
}

// Add cache buster to script tag so the browser updates
html = html.replace(/<script src="js\/script\.js\?v=[0-9]+"><\/script>/, '<script src="js/script.js"></script>'); // reset first
html = html.replace(/<script src="js\/script\.js"><\/script>/, '<script src="js/script.js?v=2"></script>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Revert done');
