import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(
  '<div className="flex h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-slate-300 font-sans overflow-hidden">',
  '<div className="flex h-screen w-full bg-gradient-to-br from-[#111828] via-[#1E3465] to-[#1D3772] text-slate-300 font-sans overflow-hidden">'
);

fs.writeFileSync('src/App.tsx', content);
console.log('Main background gradient updated');
