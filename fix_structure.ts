import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Correct the structure: 
// 1639:             </button>
// 1640:           </div>
// 1641:         </div>
// 1642:         {/* Generated Reports */}

content = content.replace(/<\/div><\/div><\/div>\{\/\* Generated Reports \*\/\}/, '</div></div>{/* Generated Reports */}');

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed structure');
