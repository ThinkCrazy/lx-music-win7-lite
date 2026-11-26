import log from 'electron-log/node'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs'
import { app } from 'electron'

// Keep the first lines of every log useful when a Win7 machine cannot open
// the window. Do not include account data, source contents, or search terms.
const getSafeArgs = () => process.argv.map(arg => {
  if (/pass(word)?|token|cookie|proxy|user-data-dir/i.test(arg)) {
    return arg.split('=')[0] + '=<redacted>'
  }
  return arg.length > 240 ? `${arg.slice(0, 240)}...` : arg
})

let initialized = false
export const initLog = () => {
  if (initialized) return
  initialized = true
  const logsPath = app.getPath('logs')
  fs.mkdirSync(logsPath, { recursive: true })
  log.transports.file.resolvePathFn = () => path.join(logsPath, 'main.log')
  log.transports.file.level = 'info'
  log.info('========== Application start ==========')
  log.info('Runtime diagnostics', {
    buildWin7: process.env.BUILD_WIN7 == 'true',
    platform: process.platform,
    arch: process.arch,
    osArch: os.arch(),
    osRelease: os.release(),
    cpuCount: os.cpus().length,
    electron: process.versions.electron,
    chrome: process.versions.chrome,
    node: process.versions.node,
    v8: process.versions.v8,
    args: getSafeArgs(),
  })

  void app.whenReady().then(() => {
    try {
      log.info('Electron ready', {
        appVersion: app.getVersion(),
        appPath: app.getAppPath(),
        userDataPath: app.getPath('userData'),
        logsPath: app.getPath('logs'),
        gpu: app.getGPUFeatureStatus(),
      })
    } catch (err) {
      log.warn('Unable to collect post-ready diagnostics', err)
    }
  })
}
