import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Replace the main container background with a gradient
content = content.replace(
  '<div className="flex h-screen w-full bg-[#1A1D24] text-slate-300 font-sans overflow-hidden">',
  '<div className="flex h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-slate-300 font-sans overflow-hidden">'
);

// 2. Remove other bg-[#1A1D24] so the gradient shows through
content = content.replace(/bg-\[#1A1D24\]/g, 'bg-transparent');

// 3. Replace other hex colors
content = content.replace(/#151822/g, '#0f172a'); // Sidebar/Panels
content = content.replace(/#222732/g, '#24335a'); // Cards
content = content.replace(/#2A3143/g, '#324476'); // Hover/Input
content = content.replace(/#333B4F/g, '#42578c'); // Borders
content = content.replace(/#475569/g, '#5a73b0'); // Lighter borders

fs.writeFileSync('src/App.tsx', content);
console.log('Colors replaced in App.tsx');

let cssContent = fs.readFileSync('src/index.css', 'utf-8');
cssContent = cssContent.replace(/#2A3143/g, '#324476');
cssContent = cssContent.replace(/#333B4F/g, '#42578c');
fs.writeFileSync('src/index.css', cssContent);
console.log('Colors replaced in index.css');
