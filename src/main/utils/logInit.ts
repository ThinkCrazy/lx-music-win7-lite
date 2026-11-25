import log from 'electron-log/node'
import os from 'node:os'
import { app } from 'electron'

log.transports.file.level = 'info'

// Keep the first lines of every log useful when a Win7 machine cannot open
// the window. Do not include account data, source contents, or search terms.
const getSafeArgs = () => process.argv
  .filter(arg => !/pass(word)?|token|cookie|proxy/i.test(arg))
  .map(arg => arg.length > 240 ? `${arg.slice(0, 240)}...` : arg)

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
  cwd: process.cwd(),
  args: getSafeArgs(),
})

process.on('exit', code => {
  log.info(`Application exit, code=${code}`)
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
