# Imposter – Features

Alle Spieler bekommen dasselbe geheime Wort, nur der Imposter nicht. Reihum sagt jeder ein Wort dazu, danach wird
diskutiert und abgestimmt.

- **Code:** [Imposter.svelte](Imposter.svelte), [words.ts](words.ts)
- **Registriert in:** [src/games/index.ts](../index.ts)
- **Spieler:** ab 3

---

## Umgesetzte Features

### Spielablauf

| Feature | Details | Seit |
|---|---|---|
| Phasen-Ablauf | Einstellungen → Rollen ansehen → Diskussion → Abstimmung → Auflösung → neue Runde | 0.1.0 |
| Rollen verdeckt ansehen | Das Handy wird herumgereicht. Jeder deckt seine Rolle selbst auf und verdeckt sie wieder. | 0.1.0 |
| Startspieler | Wird zufällig bestimmt, ist aber nie ein Imposter. | 0.1.0 |
| Abstimmung | Ein eigener Schritt „Abgestimmt?“ vor der Auflösung, damit niemand vorher etwas sieht | 0.1.0 |
| Auflösung | Zeigt alle Imposter, das Wort und die Kategorie. | 0.1.0 |
| Neue Runde | Startet direkt mit denselben Spielern und Einstellungen. | 0.1.0 |

### Einstellungen

Die Einstellungen werden gespeichert (`localStorage`-Schlüssel `partyspiele:imposter:settings`).

| Feature | Details | Seit |
|---|---|---|
| Anzahl Imposter | 1 bis ⌊(Spieler − 1) / 2⌋. Der Wert wird automatisch begrenzt, wenn Spieler entfernt werden. | 0.1.0 |
| Diskussionszeit | 0 bis 15 Minuten, 0 schaltet den Timer aus. Standard: 3 Minuten. | 0.1.0 |
| Kategorie-Hinweis | Ist er an, sieht der Imposter die Kategorie des Wortes. Standard: an. | 0.1.0 |
| Kategorienauswahl | Mehrfachauswahl, mindestens eine Kategorie bleibt aktiv. | 0.1.0 |

### Inhalte

| Feature | Details | Seit |
|---|---|---|
| Wortlisten | 7 Kategorien mit zusammen 182 Wörtern: Essen & Trinken, Orte, Tiere, Berufe, Gegenstände, Sport & Freizeit, Filme & Figuren | 0.1.0 |
| Keine Wortwiederholung | Innerhalb einer Sitzung kommt kein Wort doppelt. Ist der Vorrat erschöpft, beginnt er von vorn. | 0.1.0 |

---

## Auswirkungen auf den Rest der App

Imposter war das erste Spiel. Fast die ganze gemeinsame Basis ist deshalb für Imposter entstanden. Wer sie
ändert, muss Imposter mittesten.

| Entstanden für Imposter | Ort | Wer es noch nutzt |
|---|---|---|
| **Spiele-Registry** (`GameInfo` mit `onexit`-Prop) – jedes Spiel ist eine Komponente | [src/games/index.ts](../index.ts) | Startseite, App |
| **Hash-Router** `#/<spielId>` | [src/lib/router.svelte.ts](../../lib/router.svelte.ts) | App, Startseite |
| **Gemeinsame Spielerliste**: wird einmal eingegeben und gilt für alle Spiele | [src/lib/stores/players.svelte.ts](../../lib/stores/players.svelte.ts) | alle künftigen Spiele |
| **`persisted()`**: reaktiver Zustand mit `localStorage`. Neue Einstellungsfelder bekommen beim Laden automatisch ihren Standardwert. | [src/lib/persisted.svelte.ts](../../lib/persisted.svelte.ts) | Spielerliste, InstallHint |
| **`PassAndReveal`**: generischer Ablauf zum Weitergeben und Aufdecken, der geheime Inhalt kommt als Snippet | [src/lib/components/](../../lib/components/) | alle Spiele mit geheimen Rollen |
| **`PlayerSetup`**, **`Stepper`**, **`Toggle`**, **`ChipSelect`**, **`Card`**, **`Button`**, **`Screen`** | [src/lib/components/](../../lib/components/) | alle Spiele |
| **`Timer`**: Countdown mit Signalton. Läuft im Hintergrund korrekt weiter, weil er die Endzeit berechnet statt herunterzuzählen. | [src/lib/components/Timer.svelte](../../lib/components/Timer.svelte) | alle Spiele mit Zeitlimit |
| **Zufallshelfer** `shuffle`, `pick`, `pickIndices` | [src/lib/random.ts](../../lib/random.ts) | alle Spiele |
| **Wake Lock**: Der Bildschirm bleibt an, solange ein Spiel offen ist. | [src/App.svelte](../../App.svelte), [src/lib/wakeLock.ts](../../lib/wakeLock.ts) | gilt global für alle Spiele |

---

## Bekannte Einschränkungen

- **Zurück-Button bricht die Runde ohne Nachfrage ab.** Er führt aus jeder Spielphase zurück zu den Einstellungen.
- **Die laufende Runde wird nicht gespeichert.** Wird die App neu geladen oder von iOS beendet, ist die Runde weg.
- **Die Liste bereits gespielter Wörter** liegt nur im Arbeitsspeicher und beginnt nach jedem Neustart von vorn.
- **Signalton im Stummmodus:** Ist das iPhone stumm geschaltet, hört man den Signalton am Ende des Timers nicht.
- **Keine Vibration**, weil iOS die Vibration API nicht unterstützt.

## Ideen / Backlog

- [ ] Rückfrage beim Abbrechen einer laufenden Runde
- [ ] Punktezählung über mehrere Runden
- [ ] Imposter darf am Ende das Wort raten
- [ ] Eigene Wörter bzw. eigene Kategorien anlegen
- [ ] Variante: Der Imposter bekommt ein ähnliches Wort statt gar keinem
- [ ] Mehr Kategorien und Wörter
