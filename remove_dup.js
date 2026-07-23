const fs = require('fs');
let lines = fs.readFileSync('index.html', 'utf8').split('\n');

const firstCon4 = lines.findIndex(l => l.includes('id="con-4"'));
const secondCon4 = lines.findIndex((l, i) => i > firstCon4 && l.includes('id="con-4"'));

if (secondCon4 !== -1) {
    const startDelete = secondCon4 - 1; // Includes the <!-- TAB 4 comment
    let endDelete = lines.findIndex((l, i) => i > secondCon4 && l.includes('</section>'));
    
    // We want to KEEP the </section> to close the TMJ section!
    // So we delete up to endDelete - 1
    if (endDelete !== -1) {
        lines.splice(startDelete, endDelete - startDelete);
        fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
        console.log('Successfully deleted the duplicate con-4 block. Lines removed:', endDelete - startDelete);
    } else {
        console.log('Could not find </section> after second con-4');
    }
} else {
    console.log('No second con-4 found.');
}
