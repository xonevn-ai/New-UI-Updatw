const fs = require('fs');
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

const renderSlideContent = lines.slice(1139, 1277);

const newLines = [
  ...lines.slice(0, 896),
  ...renderSlideContent,
  ...lines.slice(896, 1139),
  ...lines.slice(1483)
];

fs.writeFileSync('src/App.tsx', newLines.join('\n'));
