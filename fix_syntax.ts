import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Fix 1: Add missing closing div for header
content = content.replace(/<\/div>\s*<\/div>\s*\{\/\* Generated Reports \*\/\}/, '</div></div></div>{/* Generated Reports */}');

// Fix 2: Remove extra section closing tag
content = content.replace(/<\/div>\s*<\/div>\s*<\/section>\s*<\/section>/, '</div></div></section>');

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed syntax errors');
