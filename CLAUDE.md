# Partyspiele

PWA mit Partyspielen zum Herumreichen auf einem Gerät (iPhone). Vite + Svelte 5 + TypeScript, Deployment über GitHub Pages bei jedem Push auf `main`.

## Grundvoraussetzung: leichtgewichtig und offline spielbar

Das gilt für alle Spiele und Features. **Widerspricht ein gewünschtes Feature diesem Grundsatz, weise den Nutzer vor der Umsetzung darauf hin.** Nenne den Konflikt und schlage eine Offline-Alternative vor. Umgesetzt wird nur, wenn der Nutzer das trotzdem ausdrücklich will.

Ein Konflikt liegt zum Beispiel vor bei:

- **Server, Backend, Login, Accounts, Online-Synchronisation oder mehreren Geräten**, die miteinander verbunden sind
- **Laufzeitabrufen externer APIs oder CDNs**, also Schriften, Bilder, Wortlisten oder KI-Dienste, die nachgeladen werden
- **Inhalten, die nicht im Service-Worker-Precache landen**, etwa große Medien oder Daten, die erst bei Bedarf geladen werden
- **Schweren Abhängigkeiten**, wenn eine Bibliothek etwas tut, das sich mit ein paar Zeilen eigenem Code lösen lässt

Richtwert: Aktuell sind es etwa 30 KB JS (gzip). Wächst ein Feature das Bundle spürbar, z. B. um mehr als 20 KB gzip, sprich es an.

Alle Inhalte (Wortlisten, Fragen, Sounds) liegen im Repo und werden mit ausgeliefert. Gespeichert wird nur lokal (`localStorage` über `persisted()`).

## Feature-Dateien

Jedes Minispiel hat eine `FEATURES.md` in seinem Ordner (`src/games/<spiel>/FEATURES.md`).

- **Ein Feature wird umgesetzt oder geändert:** Trage es dort ein, mit der Version aus `package.json`.
- **Gemeinsamer Code wird geändert** (`src/lib/`, Registry, Router): Ergänze in der Feature-Datei des Spiels, das die Änderung ausgelöst hat, den Abschnitt „Auswirkungen auf den Rest der App“.
- **Ein neues Spiel kommt dazu:** Lege seine `FEATURES.md` nach dem Vorbild von `src/games/imposter/FEATURES.md` an.
