import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace zinc with slate
content = content.replace(/zinc-/g, 'slate-');

fs.writeFileSync('src/App.tsx', content);
console.log('Done');
