import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace rgba(20,184,166,0.15) with rgba(59,130,246,0.15)
content = content.replace(/rgba\(20,184,166,0\.15\)/g, 'rgba(59,130,246,0.15)');

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
