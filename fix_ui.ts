import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Fix 1: Fix Generated Reports header structure
const headerRegex = /<div className="px-4 py-3 bg-\[#222B45\]\/50 border-b border-\[#222B45\]\/60 flex items-center justify-between">[\s\S]*?<\/div>\s*<\/div>\s*<ChevronDown size=\{18\} className="text-slate-500" \/>\s*<\/div>/;

const newHeader = `<div className="px-4 py-3 bg-[#222B45]/50 border-b border-[#222B45]/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileOutput size={18} className="text-blue-400" />
              <h3 className="font-medium text-white">{t('generatedReports')}</h3>
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                {selectedSystemKey === 'all' ? '3' : selectedSystemKey === 'techTalk' ? '1' : selectedSystemKey === 'weeklyReport' ? '1' : selectedSystemKey === 'proposal' ? '1' : '0'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-[#181E30] rounded-lg p-0.5 border border-[#2E3A59]">
                {['all', 'today', 'last7days', 'last30days'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setReportDateFilter(f as any)}
                    className={\`px-3 py-1 text-xs font-medium rounded-md transition-colors \${reportDateFilter === f ? 'bg-[#2E3A59] text-white' : 'text-slate-400 hover:text-slate-200'}\`}
                  >
                    {t(f as any)}
                  </button>
                ))}
              </div>
              <ChevronDown size={18} className="text-slate-500" />
            </div>
          </div>`;

content = content.replace(headerRegex, newHeader);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed Generated Reports header');
