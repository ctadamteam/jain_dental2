const fs = require('fs');
const data = JSON.parse(fs.readFileSync('figma_node.json', 'utf8'));

function extractText(node, texts = []) {
  if (node.type === 'TEXT') {
    texts.push(node.characters);
  }
  if (node.children) {
    node.children.forEach(child => extractText(child, texts));
  }
  return texts;
}

if (data.nodes) {
  const nodeId = Object.keys(data.nodes)[0];
  const root = data.nodes[nodeId].document;
  const texts = extractText(root);
  console.log('Extracted texts:\n' + texts.join('\n'));
} else {
  console.log('No nodes found in response.');
}