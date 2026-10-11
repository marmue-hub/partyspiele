# Partyspiele

Partyspiele als PWA zum Herumreichen auf einem Gerät – läuft offline auf dem iPhone.

**Spielen:** https://marmue-hub.github.io/partyspiele/ → in Safari *Teilen → Zum Home-Bildschirm*.

## Entwicklung

```sh
npm install
npm run dev      # lokaler Dev-Server
npm run check    # Typprüfung
npm run build    # Produktions-Build nach dist/
```

Jeder Push auf `main` wird per GitHub Actions automatisch auf GitHub Pages veröffentlicht.

## Aufbau

```
src/
  lib/components/   wiederverwendbare UI-Bausteine
    Screen          Seitenlayout mit Header, Zurück-Button und Footer-Aktionen
    Button, Card, Stepper, Toggle, ChipSelect
    PlayerSetup     Spielerliste (wird über alle Spiele geteilt und gespeichert)
    PassAndReveal   „Handy weitergeben → aufdecken → verdecken“-Ablauf
    Timer           Countdown mit Signalton
    InstallHint     Hinweis zum Installieren auf iOS
  lib/              Router, persistenter Zustand, Zufall, Wake Lock
  games/
    index.ts        Spiele-Registry – neue Spiele hier eintragen
    imposter/       Imposter (Logik + Wortlisten)
public/logo.svg     Quelle für alle App-Icons (werden beim Build erzeugt)
```

### Neues Spiel hinzufügen

1. Ordner `src/games/<spiel>/` mit einer Komponente anlegen, die `onexit` als Prop bekommt.
2. Mit `Screen`, `PlayerSetup`, `PassAndReveal` usw. zusammenbauen.
3. In `src/games/index.ts` eintragen.
