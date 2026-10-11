# Partyspiele

PWA mit Partyspielen zum Herumreichen auf einem Gerät (iPhone). Vite + Svelte 5 + TypeScript, Deployment über GitHub Pages bei jedem Push auf `main`.

## Feature-Dateien

Jedes Minispiel hat eine `FEATURES.md` in seinem Ordner (`src/games/<spiel>/FEATURES.md`).

- **Ein Feature wird umgesetzt oder geändert:** Trage es dort ein, mit der Version aus `package.json`.
- **Gemeinsamer Code wird geändert** (`src/lib/`, Registry, Router): Ergänze in der Feature-Datei des Spiels, das die Änderung ausgelöst hat, den Abschnitt „Auswirkungen auf den Rest der App“.
- **Ein neues Spiel kommt dazu:** Lege seine `FEATURES.md` nach dem Vorbild von `src/games/imposter/FEATURES.md` an.
