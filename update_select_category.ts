import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Replace "Select System" with "Select Category"
content = content.replace(/selectSystem: 'Select System',/g, "selectCategory: 'Select Category',");
content = content.replace(/selectSystem: '시스템 선택',/g, "selectCategory: '카테고리 선택',");
content = content.replace(/selectSystem: 'Chọn hệ thống',/g, "selectCategory: 'Chọn danh mục',");
content = content.replace(/selectSystem: 'システムを選択',/g, "selectCategory: 'カテゴリを選択',");
content = content.replace(/t\('selectSystem'\)/g, "t('selectCategory')");

fs.writeFileSync('src/App.tsx', content);
console.log('selectSystem replaced');
