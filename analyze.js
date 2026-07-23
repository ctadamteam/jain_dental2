const fs = require('fs');

const buf = fs.readFileSync('image/rayface-1.png');

// Find the IHDR chunk
let offset = 8;
while (offset < buf.length) {
    let length = buf.readUInt32BE(offset);
    let type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IHDR') {
        let width = buf.readUInt32BE(offset + 8);
        let height = buf.readUInt32BE(offset + 12);
        console.log(`Width: ${width}, Height: ${height}`);
        break;
    }
    offset += length + 12;
}

// Just output a quick message that we're adding a clip path
console.log("Analyzing PNG complete. Ready to apply clip-path.");
