import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove the Right Column: Chat
const rightColumnRegex = /\{\/\* Right Column: Chat \*\/\}\s*<section className="w-\[400px\] bg-\[#111522\] flex flex-col shrink-0">[\s\S]*?<\/section>/;
content = content.replace(rightColumnRegex, '');

// 2. Update the Category Filter
const systemFilterRegex = /\{\/\* System Filter \*\/\}\s*<div className="flex items-center justify-between mb-6 bg-\[#111522\] p-4 rounded-xl border border-\[#222B45\]\/60">[\s\S]*?<\/div>\s*<\/div>/;

const newCategoryFilter = `{/* Category Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 overflow-x-auto custom-scrollbar pb-2">
            {['all', 'techTalk', 'weeklyReport', 'proposal', 'ir'].map(catKey => (
              <button 
                key={catKey}
                onClick={() => handleSystemSelect(catKey)}
                className={\`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border \${
                  selectedSystemKey === catKey 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20' 
                    : 'bg-[#181E30] text-slate-400 hover:text-slate-200 border-[#2E3A59] hover:border-[#3F4D71] hover:bg-[#222B45]'
                }\`}
              >
                {t(catKey as any)}
              </button>
            ))}
          </div>
        </div>`;

content = content.replace(systemFilterRegex, newCategoryFilter);

fs.writeFileSync('src/App.tsx', content);
console.log('UI updated');
