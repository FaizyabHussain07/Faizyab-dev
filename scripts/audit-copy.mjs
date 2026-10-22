import fs from 'node:fs'
import path from 'node:path'

/**
 * Copy audit helper.
 *
 * Prints every em dash (—) in the shipped source with its file and line, and
 * every item-level heading that is still using the serif display face, so the
 * editorial pass can be done against a real list instead of guesswork.
 */

const roots = ['app', 'components', 'data', 'lib', 'content']
const exts = ['.tsx', '.ts', '.mdx', '.md']

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (exts.includes(path.extname(entry.name))) out.push(full)
  }
  return out
}

const files = roots.flatMap((root) => walk(root))
const mode = process.argv[2] ?? 'all'

let emDashCount = 0
let serifCount = 0

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  lines.forEach((line, index) => {
    if ((mode === 'all' || mode === 'emdash') && line.includes('—')) {
      emDashCount++
      console.log(`EMDASH ${file}:${index + 1} ${line.trim()}`)
    }
    if (
      (mode === 'all' || mode === 'serif') &&
      /font-serif text-\[1\.(0|125|25)rem\]/.test(line)
    ) {
      serifCount++
      console.log(`SERIF  ${file}:${index + 1} ${line.trim()}`)
    }
  })
}

console.log(`\nem dashes: ${emDashCount}  serif item titles: ${serifCount}`)
