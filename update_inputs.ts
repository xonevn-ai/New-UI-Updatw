import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace specific input backgrounds
content = content.replace(
  'className="relative flex items-center bg-[#24335a] border border-[#42578c] rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all"',
  'className="relative flex items-center bg-[#324476] border border-[#42578c] rounded-xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all"'
);

content = content.replace(
  'className="w-full bg-[#24335a] border border-[#42578c] rounded-xl py-3 pl-10 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"',
  'className="w-full bg-[#324476] border border-[#42578c] rounded-xl py-3 pl-10 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"'
);

content = content.replace(
  'className="w-full bg-[#24335a] border border-[#5a73b0] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"',
  'className="w-full bg-[#324476] border border-[#5a73b0] rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"'
);

fs.writeFileSync('src/App.tsx', content);
console.log('Inputs updated');
