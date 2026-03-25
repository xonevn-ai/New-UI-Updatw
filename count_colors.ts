import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf-8');
const matches = content.match(/#[0-9a-fA-F]{6}/g) || [];
const counts: Record<string, number> = {};
matches.forEach(m => counts[m] = (counts[m] || 0) + 1);
console.log('Hex Colors:', counts);
