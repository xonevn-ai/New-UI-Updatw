import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace the System Filter buttons with a select dropdown
const systemFilterRegex = /<div className="flex space-x-2">\s*\{\['all', 'purchasingSystem', 'salesLogisticsSystem', 'eGeneralAffairsSystem'\].map\(sysKey => \([\s\S]*?\}\)\)\}\s*<\/div>/;

const newSystemFilter = `<div className="flex space-x-2 w-64">
            <select 
              value={selectedSystemKey}
              onChange={(e) => handleSystemSelect(e.target.value)}
              className="w-full bg-[#181E30] border border-[#2E3A59] text-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
            >
              <option value="all">{t('all')}</option>
              <option value="purchasingSystem">{t('purchasingSystem')}</option>
              <option value="salesLogisticsSystem">{t('salesLogisticsSystem')}</option>
              <option value="eGeneralAffairsSystem">{t('eGeneralAffairsSystem')}</option>
            </select>
          </div>`;

content = content.replace(systemFilterRegex, newSystemFilter);

// Remove Report Type Cards
const reportTypeCardsRegex = /\{\/\* Report Type Cards \*\/\}\s*<div className="grid grid-cols-5 gap-4 mb-8">[\s\S]*?<\/div>/;
content = content.replace(reportTypeCardsRegex, '');

fs.writeFileSync('src/App.tsx', content);
console.log('System filter and Report Type Cards updated');
