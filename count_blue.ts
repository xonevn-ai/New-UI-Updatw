import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf-8');
const matches = content.match(/bg-blue-[0-9]+/g) || [];
const counts: Record<string, number> = {};
matches.forEach(m => counts[m] = (counts[m] || 0) + 1);
console.log('Blue Backgrounds:', counts);
