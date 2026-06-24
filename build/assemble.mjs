// Assembles shell.html + build fragments -> index.html (idempotent: always reads shell.html template)
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = join(ROOT, 'build');

// order in which screen modules are injected
const SCREEN_MODULES = [
  'home-extra', 'discover', 'notifications', 'profile', 'friends', 'messages',
  'new-message', 'marketplace', 'wallet', 'egifts-verify', 'ads', 'groups',
  'polls-events', 'blogs-videos',
];

async function readIf(p) { return existsSync(p) ? await readFile(p, 'utf8') : ''; }

const shell = await readFile(join(ROOT, 'shell.html'), 'utf8');

// 1) screens
let screens = '';
const missing = [];
for (const m of SCREEN_MODULES) {
  const f = join(BUILD, m + '.html');
  if (existsSync(f)) screens += '\n      <!-- module: ' + m + ' -->\n' + (await readFile(f, 'utf8')).trim() + '\n';
  else missing.push(m);
}

// 2) drawer + sheets
const drawer = (await readIf(join(BUILD, '_drawer.html'))).trim();
const sheets = (await readIf(join(BUILD, '_sheets.html'))).trim();

let out = shell
  .replace('<!-- @@SCREENS@@  (feature modules injected here) -->', screens)
  .replace('<div id="drawer"></div>', '<div id="drawer">\n' + drawer + '\n</div>')
  .replace('<div id="sheetRoot"></div>', '<div id="sheetRoot">\n' + sheets + '\n</div>');

await writeFile(join(ROOT, 'index.html'), out, 'utf8');

// report
const screenCount = (out.match(/<section class="screen"/g) || []).length;
const sheetCount = (out.match(/<div class="sheet"/g) || []).length;
console.log('Assembled index.html');
console.log('  screens:', screenCount, '| sheets:', sheetCount, '| drawer:', drawer ? 'yes' : 'NO');
if (missing.length) console.log('  MISSING modules:', missing.join(', '));
