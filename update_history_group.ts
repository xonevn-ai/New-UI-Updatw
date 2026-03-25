import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldHistoryContentRegex = /<div className="p-4 space-y-3 overflow-y-auto custom-scrollbar flex-1">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const newHistoryContent = `<div className="p-4 space-y-6 overflow-y-auto custom-scrollbar flex-1">
            {/* Today Group */}
            {(dateFilter === 'all' || dateFilter === 'today') && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">{t('today')}</h4>
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
                <HistoryItem title={t('newInquiry')} id="RPT-2026-1042" date="2026-03-24 10:24" type="chat" t={t} />
              </div>
            )}

            {/* Last 7 Days Group */}
            {(dateFilter === 'all' || dateFilter === 'last7days') && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">{t('last7days')}</h4>
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
                <HistoryItem title={t('incidentReport') + " " + t('completed')} id="RPT-2026-9690" date="2026-03-18 20:02" type="chat" t={t} />
                <HistoryItem title={t('changePlan') + " " + t('completed')} id="RPT-2026-8077" date="2026-03-18 20:02" type="chat" t={t} />
              </div>
            )}
          </div>
        </div>
      </section>`;

content = content.replace(oldHistoryContentRegex, newHistoryContent);

fs.writeFileSync('src/App.tsx', content);
console.log('Session history grouped');
