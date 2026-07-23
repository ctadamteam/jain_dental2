const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find the start of tour-slider mt-50
const startIndex = html.indexOf('<div class="tour-slider mt-50">');
if (startIndex !== -1) {
    // Find the end of the section
    const endIndex = html.indexOf('</section>', startIndex) + '</section>'.length;
    
    const cleanSection = `<div class="tour-slider mt-50">
                    <div class="arrow left"></div>
                    <div class="arrow right"></div>
                    <div class="tour-main-img">
                    </div>
                    <div class="tour-thumbs mt-20">
                        <div class="thumb"></div>
                        <div class="thumb"></div>
                        <div class="thumb"></div>
                        <div class="thumb"></div>
                        <div class="thumb"></div>
                    </div>
                </div>
            </div>
        </section>`;
        
    const before = html.substring(0, startIndex);
    const after = html.substring(endIndex);
    
    html = before + cleanSection + after;
    
    fs.writeFileSync('index.html', html);
    console.log('Successfully cleaned up leftover HTML.');
} else {
    console.log('Could not find tour-slider mt-50');
}
