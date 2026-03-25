import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Replace the main container background gradient with the solid dark color from the new image
content = content.replace(
  'bg-gradient-to-br from-[#111828] via-[#1E3465] to-[#1D3772]',
  'bg-[#0A0D14]'
);

// 2. Replace other hex colors to match the new palette
content = content.replace(/#0f172a/gi, '#111522'); // Sidebar/Panels
content = content.replace(/#24335a/gi, '#181E30'); // Cards/Inner items
content = content.replace(/#324476/gi, '#222B45'); // Hover/Input/Active
content = content.replace(/#42578c/gi, '#2E3A59'); // Borders
content = content.replace(/#5a73b0/gi, '#3F4D71'); // Lighter borders

fs.writeFileSync('src/App.tsx', content);
console.log('Colors replaced in App.tsx');

let cssContent = fs.readFileSync('src/index.css', 'utf-8');
cssContent = cssContent.replace(/#324476/gi, '#222B45');
cssContent = cssContent.replace(/#42578c/gi, '#2E3A59');
fs.writeFileSync('src/index.css', cssContent);
console.log('Colors replaced in index.css');
