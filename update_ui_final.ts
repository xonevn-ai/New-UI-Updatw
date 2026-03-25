import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Move Category Filter and Add Date Filter to Header
const headerRegex = /\{\/\* Header \*\/\}[\s\S]*?<\/div>\s*<\/div>/;
const newHeader = `{/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-500/30">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Summaro</h2>
              <p className="text-sm text-slate-400">{t('agentId')}: a6</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Category Select (Scalable) */}
            <select 
              value={selectedSystemKey}
              onChange={(e) => handleSystemSelect(e.target.value)}
              className="bg-[#181E30] text-slate-200 text-sm rounded-lg px-3 py-2 border border-[#2E3A59] focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {['all', 'techTalk', 'weeklyReport', 'proposal', 'ir', 'other1', 'other2'].map(catKey => (
                <option key={catKey} value={catKey}>{t(catKey as any)}</option>
              ))}
            </select>
            <button 
              onClick={() => setShowPromptPopup(true)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
              <Sparkles size={16} />
              <span>{t('generateSlide')}</span>
            </button>
          </div>
        </div>`;
content = content.replace(headerRegex, newHeader);

// 2. Remove old Category Filter
const oldCategoryFilterRegex = /\{\/\* Category Filter \*\/\}[\s\S]*?<\/div>\s*<\/div>/;
content = content.replace(oldCategoryFilterRegex, '');

// 3. Add Date Filter to Generated Reports
const generatedReportsHeaderRegex = /<h3 className="font-medium text-white">{t\('generatedReports'\)}<\/h3>\s*<span className="bg-blue-500\/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">[\s\S]*?<\/span>/;
const newGeneratedReportsHeader = `<h3 className="font-medium text-white">{t('generatedReports')}</h3>
              <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                {selectedSystemKey === 'all' ? '3' : selectedSystemKey === 'techTalk' ? '1' : selectedSystemKey === 'weeklyReport' ? '1' : selectedSystemKey === 'proposal' ? '1' : '0'}
              </span>
            </div>
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
            </div>`;
content = content.replace(generatedReportsHeaderRegex, newGeneratedReportsHeader);

// 4. Update Session History to include Last Month
const sessionHistoryFilterRegex = /<button \s*onClick=\{\(\) => setDateFilter\('last7days'\)\}\s*className=\{\`px-3 py-1 text-xs font-medium rounded-md transition-colors \$\{dateFilter === 'last7days' \? 'bg-\[#2E3A59\] text-white' : 'text-slate-400 hover:text-slate-200'\}\`\}>\s*\{t\('last7days'\)\}\s*<\/button>/;
const newSessionHistoryFilter = `<button 
                onClick={() => setDateFilter('last7days')}
                className={\`px-3 py-1 text-xs font-medium rounded-md transition-colors \${dateFilter === 'last7days' ? 'bg-[#2E3A59] text-white' : 'text-slate-400 hover:text-slate-200'}\`}
              >
                {t('last7days')}
              </button>
              <button 
                onClick={() => setDateFilter('last30days')}
                className={\`px-3 py-1 text-xs font-medium rounded-md transition-colors \${dateFilter === 'last30days' ? 'bg-[#2E3A59] text-white' : 'text-slate-400 hover:text-slate-200'}\`}
              >
                {t('last30days')}
              </button>`;
content = content.replace(sessionHistoryFilterRegex, newSessionHistoryFilter);

fs.writeFileSync('src/App.tsx', content);
console.log('UI updated with new filters');
