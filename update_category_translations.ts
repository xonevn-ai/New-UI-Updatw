import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

const enTranslations = `
    purchasingSystem: 'Purchasing System',
    techTalk: 'Tech Talk',
    weeklyReport: 'Weekly Report',
    proposal: 'Proposal',
    ir: 'IR (Investor Relations)',
`;
content = content.replace(/purchasingSystem: 'Purchasing System',/g, enTranslations);

const koTranslations = `
    purchasingSystem: '구매시스템',
    techTalk: '테크 톡',
    weeklyReport: '주간 보고서',
    proposal: '제안서',
    ir: 'IR (투자자 관계)',
`;
content = content.replace(/purchasingSystem: '구매시스템',/g, koTranslations);

const viTranslations = `
    purchasingSystem: 'Hệ thống mua hàng',
    techTalk: 'Tech Talk',
    weeklyReport: 'Báo cáo tuần',
    proposal: 'Đề xuất',
    ir: 'IR (Quan hệ nhà đầu tư)',
`;
content = content.replace(/purchasingSystem: 'Hệ thống mua hàng',/g, viTranslations);

const jaTranslations = `
    purchasingSystem: '購買システム',
    techTalk: 'テックトーク',
    weeklyReport: '週次レポート',
    proposal: '提案書',
    ir: 'IR（投資家向け広報）',
`;
content = content.replace(/purchasingSystem: '購買システム',/g, jaTranslations);

fs.writeFileSync('src/App.tsx', content);
console.log('Category translations added');
