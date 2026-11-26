const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const electronVersion = require(path.join(root, 'node_modules/electron/package.json')).version
const sqliteVersion = require(path.join(root, 'node_modules/better-sqlite3/package.json')).version
const undiciVersion = require(path.join(root, 'node_modules/undici/package.json')).version
const sqliteBinary = path.join(__dirname, 'lib', 'better_sqlite3_win32-ia32.node')

if (electronVersion !== '22.3.0') throw new Error(`Win7 requires Electron 22.3.0, got ${electronVersion}`)
if (sqliteVersion !== '12.6.0') throw new Error(`Win7 requires better-sqlite3 12.6.0, got ${sqliteVersion}`)
if (undiciVersion !== '5.28.4') throw new Error(`Win7 requires undici 5.28.4, got ${undiciVersion}`)
if (!fs.existsSync(sqliteBinary)) throw new Error(`Missing Win7 x86 SQLite binary: ${sqliteBinary}`)

console.log(`Win7 runtime verified: Electron ${electronVersion}, better-sqlite3 ${sqliteVersion}, undici ${undiciVersion}, ia32 SQLite binary present`)
