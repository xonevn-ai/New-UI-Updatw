import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// The error says:
// /src/App.tsx:1641:10: ERROR: Unexpected closing "div" tag does not match opening "section" tag
// 1641:          </div>
// 1642:          {/* Generated Reports */}

// This means the section started before 1641 and wasn't closed properly.
// Let's look at the structure.

// Actually, looking at the error:
// /src/App.tsx:1836:8: ERROR: Unexpected closing "section" tag does not match opening "div" tag

// It seems I have a section tag that is not closed or closed in the wrong place.

// Let's find the section opening tag.
const sectionOpen = content.indexOf('<section className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar border-r border-[#222B45]/60">');
const sectionClose = content.lastIndexOf('</section>');

// This is too complex to fix with regex. Let's just add a closing div before the section close and remove the extra section close.

// Actually, the error is:
// 1836:        </section>
// 1837:  
// 1838:        
// 1839:        {/* Prompt Popup */}

// It seems the section is closed at 1836.
// Let's just make sure all divs are closed.

// Let's try to fix the section tag.
// The section starts at 1591.
// Let's ensure it's closed at the end of the section.

// The error says:
// 1834:            </div>
// 1835:          </div>
// 1836:        </section>

// This seems correct for the section.

// Wait, the error says:
// 1641:          </div>
// 1642:          {/* Generated Reports */}

// This div at 1641 is inside the section.
// It seems the div at 1641 is closing something that wasn't opened in the section.

// Let's look at the header:
// 1593:        <div className="flex items-center justify-between mb-8">
// ...
// 1640:           </div>
// 1641:         </div>

// The header div is closed at 1640.
// So 1641 is indeed extra.

content = content.replace(/<\/div>\n\s*\{\/\* Generated Reports \*\/\}/, '{/* Generated Reports */}');

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed extra div');
