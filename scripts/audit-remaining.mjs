import fs from 'node:fs';
import path from 'node:path';

const roots = ['app', 'data', 'lib', 'components', 'content'];
const exts = /\.tsx?|\.mdx?$/;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

let total = 0;
for (const root of roots) {
  for (const file of walk(root)) {
    if (!exts.test(file)) continue;
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      if (line.includes('\u2014')) {
        total++;
        console.log(`${file}:${i + 1}: ${line.trim()}`);
      }
    });
  }
}
console.log(`\nTotal em dashes remaining: ${total}`);