import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace state
content = content.replace(
  "const [historyFilter, setHistoryFilter] = useState<'all' | 'chat' | 'slide'>('all');",
  "const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'last7days' | 'last30days'>('all');"
);

// Replace buttons
const oldButtonsRegex = /<div className="flex bg-\[#181E30\] rounded-lg p-0\.5 border border-\[#2E3A59\]">[\s\S]*?<\/div>/;
const newButtons = `<div className="flex bg-[#181E30] rounded-lg p-0.5 border border-[#2E3A59]">
              <button 
                onClick={() => setDateFilter('all')}
                className={\`px-3 py-1 text-xs font-medium rounded-md transition-colors \${dateFilter === 'all' ? 'bg-[#2E3A59] text-white' : 'text-slate-400 hover:text-slate-200'}\`}
              >
                {t('all')}
              </button>
              <button 
                onClick={() => setDateFilter('today')}
                className={\`px-3 py-1 text-xs font-medium rounded-md transition-colors \${dateFilter === 'today' ? 'bg-[#2E3A59] text-white' : 'text-slate-400 hover:text-slate-200'}\`}
              >
                {t('today')}
              </button>
              <button 
                onClick={() => setDateFilter('last7days')}
                className={\`px-3 py-1 text-xs font-medium rounded-md transition-colors \${dateFilter === 'last7days' ? 'bg-[#2E3A59] text-white' : 'text-slate-400 hover:text-slate-200'}\`}
              >
                {t('last7days')}
              </button>
            </div>`;

content = content.replace(oldButtonsRegex, newButtons);

fs.writeFileSync('src/App.tsx', content);
console.log('Date filter buttons updated');
