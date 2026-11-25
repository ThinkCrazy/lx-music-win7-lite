# Win7 x86 build

The Win7 package is built as a separate, frozen target. It uses Electron 22.3.0,
the last Electron line with Windows 7 support, together with the Node 16
compatible request implementation and the x86 native SQLite module.

The workflow installs the normal locked development tree first, then replaces
only the runtime packages needed by the legacy target. `--package-lock=false`
keeps the repository lock file unchanged; the versions are written directly in
`.github/workflows/win7-lite.yml` and must be changed deliberately.

Run the build from GitHub Actions with **Win7 x86 Lite**. The resulting 7z
archive is a portable green build. It does not use the updater and disables GPU
hardware acceleration at startup, which avoids common Win7 driver failures.

Before publishing a build, test it on a clean Windows 7 SP1 32-bit machine:

1. Start the program twice and after a reboot.
2. Search, play a preview, and download a file.
3. Add, remove, and switch a music source.
4. Start once without network access.
5. Rename the portable `userData` directory and start again.
