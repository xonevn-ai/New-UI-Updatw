import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldGeneratedReportsRegex = /\{\/\* Generated Reports \*\/\}\s*<div className="mb-8 bg-\[#111522\] rounded-xl border border-\[#222B45\]\/60 overflow-hidden">[\s\S]*?<\/div>\s*<\/div>/;

const newGeneratedReports = `{/* Generated Reports */}
        <div className="mb-8 bg-[#111522] rounded-xl border border-[#222B45]/60 overflow-hidden">
          <div className="px-4 py-3 bg-[#222B45]/50 border-b border-[#222B45]/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileOutput size={18} className="text-blue-400" />
              <h3 className="font-medium text-white">{t('generatedReports')}</h3>
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">3</span>
            </div>
            <ChevronDown size={18} className="text-slate-500" />
          </div>
          <div className="p-4 space-y-6">
            {/* Today Group */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">{t('today')}</h4>
              <div className="bg-[#181E30] border border-[#2E3A59] rounded-lg p-3 flex items-center justify-between hover:border-[#3F4D71] transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <FileOutput size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{t('incidentReport')} - Q1 2026</h4>
                    <p className="text-xs text-slate-400">2026-03-24 15:45 • PDF</p>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-[#222B45] rounded-md text-slate-400 transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Last 7 Days Group */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">{t('last7days')}</h4>
              <div className="bg-[#181E30] border border-[#2E3A59] rounded-lg p-3 flex items-center justify-between hover:border-[#3F4D71] transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <FileOutput size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{t('changeResultReport')} - v2.1</h4>
                    <p className="text-xs text-slate-400">2026-03-20 09:30 • DOCX</p>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-[#222B45] rounded-md text-slate-400 transition-colors">
                  <Download size={16} />
                </button>
              </div>
              <div className="bg-[#181E30] border border-[#2E3A59] rounded-lg p-3 flex items-center justify-between hover:border-[#3F4D71] transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-amber-500/20 flex items-center justify-center text-amber-400">
                    <FileOutput size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{t('changePlan')} - DB Migration</h4>
                    <p className="text-xs text-slate-400">2026-03-18 14:15 • PDF</p>
                  </div>
                </div>
                <button className="p-1.5 hover:bg-[#222B45] rounded-md text-slate-400 transition-colors">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>`;

content = content.replace(oldGeneratedReportsRegex, newGeneratedReports);

fs.writeFileSync('src/App.tsx', content);
console.log('Generated reports grouped');
