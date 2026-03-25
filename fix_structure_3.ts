import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace the broken closing tags
content = content.replace(/<\/div><\/div><\/div>\{\/\* Generated Reports \*\/\}/, '</div></div>{/* Generated Reports */}');

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed structure properly');
