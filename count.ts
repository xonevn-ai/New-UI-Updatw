import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf-8');
const matches = content.match(/bg-\[#[0-9a-fA-F]+\]/g) || [];
const counts: Record<string, number> = {};
matches.forEach(m => counts[m] = (counts[m] || 0) + 1);
console.log('Backgrounds:', counts);

const borderMatches = content.match(/border-\[#[0-9a-fA-F]+\]/g) || [];
const borderCounts: Record<string, number> = {};
borderMatches.forEach(m => borderCounts[m] = (borderCounts[m] || 0) + 1);
console.log('Borders:', borderCounts);

const textMatches = content.match(/text-\[#[0-9a-fA-F]+\]/g) || [];
const textCounts: Record<string, number> = {};
textMatches.forEach(m => textCounts[m] = (textCounts[m] || 0) + 1);
console.log('Text:', textCounts);
