const fs = require('fs');
const lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');

// 0-indexed
// renderSlideContent is from line 1139 to 1276 (inclusive)
const renderSlideContent = lines.slice(1139, 1277);

// The old right panel top bar ends at line 1138
// The new canvas area starts at line 1483
const newLines = [
  ...lines.slice(0, 896),
  ...renderSlideContent,
  ...lines.slice(896, 1139),
  ...lines.slice(1483)
];

fs.writeFileSync('src/App.tsx', newLines.join('\n'));
