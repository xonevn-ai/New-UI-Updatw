import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/bg-\[#1e1e1e\]/g, 'bg-[#0A0D14]');
content = content.replace(/bg-\[#2d2d2d\]/g, 'bg-[#181E30]');

fs.writeFileSync('src/App.tsx', content);
console.log('Editor backgrounds updated');
