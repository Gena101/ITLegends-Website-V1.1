import { readFileSync, writeFileSync } from 'node:fs';
const path = 'src/pages/legacy/LegacyHome.tsx';
let s = readFileSync(path, 'utf8');
const before = s;
const log = [];

// 1. Drop the old router shell: function App() { ... } up to its closing brace
s = s.replace(/^function App\(\) \{[\s\S]*?\r?\n\}\r?\n\r?\n/m, '');
log.push('removed App()');

// 2. HomePage becomes the default export and owns its own menu state
s = s.replace(
  /^function HomePage\(\{[\s\S]*?\n\}\) \{\r?\n/m,
  'export default function LegacyHome() {\r\n  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\r\n',
);
log.push('HomePage -> export default LegacyHome');

// 3. Remove the trailing default export of App
s = s.replace(/\r?\nexport default App;\r?\n?/, '\n');

// 4. Remove imports only the old router used
s = s.replace(/^import .*? from '\.\/pages\/.*?';\r?\n/gm, '');
s = s.replace(/^import CookieBanner from '\.\/components\/CookieBanner';\r?\n/m, '');
s = s.replace(
  /^import \{ BrowserRouter, Routes, Route, Link \} from 'react-router-dom';/m,
  "import { Link } from 'react-router-dom';",
);
log.push('removed unused page/router imports');

// 5. Fix relative paths for the new folder (src/pages/legacy/)
s = s.replace(/from '\.\/pages\//g, "from '../");
s = s.replace(/from '\.\//g, "from '../../");
log.push('rewrote relative imports');

if (s === before) { console.error('NO CHANGES MADE - stop and report this'); process.exit(1); }
writeFileSync(path, s);
console.log(log.join('\n'));
