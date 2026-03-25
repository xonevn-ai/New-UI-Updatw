const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
const enMatch = content.match(/en: \{([\s\S]*?)\},/);
if (enMatch) {
  const lines = enMatch[1].split('\n');
  const keys = [];
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('//') && trimmed.includes(':')) {
      keys.push(trimmed.split(':')[0].trim());
    }
  });
  const counts = {};
  keys.forEach(k => counts[k] = (counts[k] || 0) + 1);
  Object.keys(counts).forEach(k => {
    if (counts[k] > 1) console.log('Duplicate key in en:', k);
  });
}
const koMatch = content.match(/ko: \{([\s\S]*?)\},/);
if (koMatch) {
  const lines = koMatch[1].split('\n');
  const keys = [];
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('//') && trimmed.includes(':')) {
      keys.push(trimmed.split(':')[0].trim());
    }
  });
  const counts = {};
  keys.forEach(k => counts[k] = (counts[k] || 0) + 1);
  Object.keys(counts).forEach(k => {
    if (counts[k] > 1) console.log('Duplicate key in ko:', k);
  });
}
const viMatch = content.match(/vi: \{([\s\S]*?)\},/);
if (viMatch) {
  const lines = viMatch[1].split('\n');
  const keys = [];
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('//') && trimmed.includes(':')) {
      keys.push(trimmed.split(':')[0].trim());
    }
  });
  const counts = {};
  keys.forEach(k => counts[k] = (counts[k] || 0) + 1);
  Object.keys(counts).forEach(k => {
    if (counts[k] > 1) console.log('Duplicate key in vi:', k);
  });
}
