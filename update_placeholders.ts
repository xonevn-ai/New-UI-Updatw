import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/placeholder-slate-500/g, 'placeholder-slate-400');

fs.writeFileSync('src/App.tsx', content);
console.log('Placeholders updated');
