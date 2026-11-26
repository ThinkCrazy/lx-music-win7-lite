# Win7 x86 build

The Win7 package is built as a separate, frozen target. It uses Electron 22.3.0,
the last Electron line with Windows 7 support, together with the Node 16
compatible request implementation and the x86 native SQLite module.

The workflow installs the normal locked development tree first, then replaces
only the runtime packages needed by the legacy target. The required versions
are checked by `build-config/verify-win7.js`; change them deliberately in both
that check and `.github/workflows/win7-lite.yml`.

Run the **Win7 x86 Lite** workflow from GitHub Actions. The general release
workflow is manual-only, so pushes to `master` do not start Linux, macOS, or
other Windows package jobs. The resulting 7z
archive is a portable x86 build. It creates `portable/userData` beside the
executable, does not use the updater, and disables GPU
hardware acceleration at startup, which avoids common Win7 driver failures.

Before publishing a build, test it on a clean Windows 7 SP1 32-bit machine:

1. Start the program twice and after a reboot.
2. Search, play a preview, and download a file.
3. Add, remove, and switch a music source.
4. Start once without network access.
5. Rename the portable `userData` directory and start again.

## Collecting a failure log

The application writes a diagnostic header to `main.log` on every start. It
contains the Windows and Electron versions, x86/Win7 build flag, GPU feature
status, user-data and log paths, startup arguments with sensitive values
filtered, and uncaught errors. It does not record account credentials, cookies,
search terms, or source contents.

For a machine that shows no window, copy the newest `main.log` from
`portable/userData/logs` and send it with the exact action
that failed. The first `Runtime diagnostics` block and the last error are the
most useful parts.
