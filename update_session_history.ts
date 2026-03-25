import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const sessionHistoryRegex = /\{\/\* Session History \*\/\}\s*<div className="bg-\[#111522\] rounded-xl border border-\[#222B45\]\/60 overflow-hidden flex-1 flex flex-col min-h-\[300px\]">[\s\S]*?<\/section>/;

const newSessionHistory = `{/* Session History */}
        <div className="bg-[#111522] rounded-xl border border-[#222B45]/60 overflow-hidden flex-1 flex flex-col min-h-[300px]">
          <div className="px-4 py-3 bg-[#222B45]/50 border-b border-[#222B45]/60 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <History size={18} className="text-blue-400" />
              <h3 className="font-medium text-white">{t('sessionHistory')}</h3>
            </div>
            <div className="flex bg-[#181E30] rounded-lg p-0.5 border border-[#2E3A59]">
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
            </div>
          </div>
          <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            {/* Today Group */}
            {(dateFilter === 'all' || dateFilter === 'today') && (selectedSystemKey === 'all' || selectedSystemKey === 'weeklyReport' || selectedSystemKey === 'ir') && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">{t('today')}</h4>
                {(selectedSystemKey === 'all' || selectedSystemKey === 'weeklyReport') && (
                  <HistoryItem 
                    title={t('quarterlyReview')} 
                    id="SLD-2026-1045" 
                    date="2026-03-24 14:30" 
                    type="slide" 
                    t={t}
                    onClick={() => onStartSlideGeneration({
                      isGuideMode: true,
                      guideData: { purpose: t('quarterlyReview'), audience: t('management'), content: t('quarterlyReviewDesc'), slideCount: '10', ratio: '16:9', language: 'English' },
                      inputValue: '',
                      attachedFiles: [],
                      selectedCategory: 'tech-talk',
                      selectedTemplate: 'tt-1',
                      isHistory: true
                    })}
                  />
                )}
                {(selectedSystemKey === 'all' || selectedSystemKey === 'ir') && (
                  <HistoryItem title={t('newInquiry')} id="RPT-2026-1042" date="2026-03-24 10:24" type="chat" t={t} />
                )}
              </div>
            )}

            {/* Last 7 Days Group */}
            {(dateFilter === 'all' || dateFilter === 'last7days') && (selectedSystemKey === 'all' || selectedSystemKey === 'techTalk' || selectedSystemKey === 'proposal') && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">{t('last7days')}</h4>
                {(selectedSystemKey === 'all' || selectedSystemKey === 'techTalk') && (
                  <HistoryItem 
                    title={t('techTalkAi')} 
                    id="SLD-2026-0988" 
                    date="2026-03-20 11:15" 
                    type="slide" 
                    t={t}
                    onClick={() => onStartSlideGeneration({
                      isGuideMode: true,
                      guideData: { purpose: t('techTalkAi'), audience: t('engineeringTeam'), content: t('techTalkAiDesc'), slideCount: '15', ratio: '16:9', language: 'Vietnamese' },
                      inputValue: '',
                      attachedFiles: [],
                      selectedCategory: 'tech-talk',
                      selectedTemplate: 'tt-1',
                      isHistory: true
                    })}
                  />
                )}
                {(selectedSystemKey === 'all' || selectedSystemKey === 'proposal') && (
                  <>
                    <HistoryItem title={t('incidentReport') + " " + t('completed')} id="RPT-2026-9690" date="2026-03-18 20:02" type="chat" t={t} />
                    <HistoryItem title={t('changePlan') + " " + t('completed')} id="RPT-2026-8077" date="2026-03-18 20:02" type="chat" t={t} />
                  </>
                )}
              </div>
            )}
            
            {/* Empty State */}
            {((dateFilter === 'today' && selectedSystemKey === 'techTalk') || 
              (dateFilter === 'today' && selectedSystemKey === 'proposal') ||
              (dateFilter === 'last7days' && selectedSystemKey === 'weeklyReport') ||
              (dateFilter === 'last7days' && selectedSystemKey === 'ir')) && (
              <div className="p-8 text-center text-slate-500 text-sm">
                {t('noGeneratedReports')}
              </div>
            )}
          </div>
        </div>
      </section>`;

content = content.replace(sessionHistoryRegex, newSessionHistory);

fs.writeFileSync('src/App.tsx', content);
console.log('Session history updated');
