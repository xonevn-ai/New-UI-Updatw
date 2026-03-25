import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Add translations
const enTranslations = `
    all: 'All',
    today: 'Today',
    last7days: 'Last 7 Days',
    last30days: 'Last 30 Days',
`;
content = content.replace(/all: 'All',/g, enTranslations);

const koTranslations = `
    all: '전체',
    today: '오늘',
    last7days: '최근 7일',
    last30days: '최근 30일',
`;
content = content.replace(/all: '전체',/g, koTranslations);

const viTranslations = `
    all: 'Tất cả',
    today: 'Hôm nay',
    last7days: '7 ngày qua',
    last30days: '30 ngày qua',
`;
content = content.replace(/all: 'Tất cả',/g, viTranslations);

const jaTranslations = `
    all: 'すべて',
    today: '今日',
    last7days: '過去7日間',
    last30days: '過去30日間',
`;
content = content.replace(/all: 'すべて',/g, jaTranslations);

fs.writeFileSync('src/App.tsx', content);
console.log('Translations added');
