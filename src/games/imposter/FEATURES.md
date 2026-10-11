# Imposter – Features

Alle Spieler bekommen dasselbe geheime Wort, nur der Imposter nicht. Reihum sagt jeder ein Wort dazu, danach wird
diskutiert und abgestimmt.

- **Code:** [Imposter.svelte](Imposter.svelte), [words.ts](words.ts)
- **Registriert in:** [src/games/index.ts](../index.ts)
- **Spieler:** 3 bis 20

---

## Umgesetzte Features

### Spieler

| Feature | Details | Seit |
|---|---|---|
| Spielerliste | Namen eingeben, ohne Doppelte (Groß-/Kleinschreibung egal), maximal 20 Zeichen. Die Liste wird gespeichert. | 0.1.0 |
| Spielerfarben | Jeder Spieler wählt eine von 20 Farben (bis 0.2.0 waren es 12). Vergebene Farben sind gesperrt und zeigen die Initialen ihres Besitzers. Vorausgewählt ist die erste freie Farbe. | 0.2.0 |
| Farbe ändern | Antippen des Farbkreises neben dem Namen öffnet die Palette für diesen Spieler. | 0.2.0 |
| Spieler bearbeiten | Antippen eines Spielers macht seinen Namen editierbar und öffnet die Palette für ihn. Die Farbe ändert sich sofort, der Name wird mit ✓ oder Enter übernommen. Doppelte oder leere Namen werden abgelehnt. | 0.3.0 |
| Farbe als Hintergrund | Beim Herumreichen („Gib das Handy an …“) ist die Fläche in der Farbe des Spielers gefüllt. Auch die aufgedeckte Karte ist in seiner Farbe eingefärbt. | 0.2.0 |
| Aufdecken-Button in Spielerfarbe | Auch „Ich bin … – aufdecken“ hat die Farbe des Spielers, der dran ist. | 0.4.0 |
| Eindeutige Initialen | Jeder Farbkreis zeigt Initialen, die es nur einmal gibt. Bei Gleichstand wird auf andere Buchstaben ausgewichen (Michael = Mi, Mia = Ma), bei zwei Wörtern werden die Anfangsbuchstaben genommen (Anna Lena = AL). Wer früher in der Liste steht, behält seine Initialen. | 0.4.0 |
| Farbige Namen | Startspieler und Imposter werden in der Auflösung als Farb-Chip angezeigt. | 0.2.0 |
| Avatar beim Weitergeben | Auf dem Weitergeben-Screen erscheint ein großer Farbkreis mit Initialen. So erkennt man auch ohne Lesen, wer dran ist. Der Aufdecken-Button hat zusätzlich ein 👁️. | 0.5.0 |
| Avatar für den Startspieler | In der Diskussionsphase zeigt ein großer Farbkreis mit Initialen, wer beginnt. | 0.5.0 |

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
| Bilder-Modus | Schalter „Bilder-Modus“. Statt eines Wortes gibt es ein großes Emoji mit dem Wort darunter, so können Leser und Nicht-Leser zusammen spielen. Der Imposter sieht 🕵️❓ und mit Kategorie-Hinweis das Kategorie-Emoji. Auch die Auflösung zeigt das Bild. Die Kategorieauswahl wird für jeden Modus getrennt gespeichert (`pictureCategoryIds`). Es gibt keine Unterscheidung nach Alter. | 0.5.0 |

### Inhalte

| Feature | Details | Seit |
|---|---|---|
| Wortlisten | 7 Kategorien mit zusammen 182 Wörtern: Essen & Trinken, Orte, Tiere, Berufe, Gegenstände, Sport & Freizeit, Filme & Figuren | 0.1.0 |
| Bilderlisten | 5 Kategorien mit zusammen 126 Emoji-Motiven: Tiere, Essen, Fahrzeuge, Dinge, Natur & Wetter. Nur Motive, die ein Kind ohne Lesen eindeutig erkennt und benennen kann. | 0.5.0 |
| Keine Wortwiederholung | Innerhalb einer Sitzung kommt kein Wort doppelt. Ist der Vorrat erschöpft, beginnt er von vorn. | 0.1.0 |

---

## Auswirkungen auf den Rest der App

Imposter war das erste Spiel. Fast die ganze gemeinsame Basis ist deshalb für Imposter entstanden. Wer sie
ändert, muss Imposter mittesten.

### Grundgerüst (0.1.0)

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

### Spielerfarben (0.2.0)

| Änderung | Ort | Folge für die App |
|---|---|---|
| **Spieler-Datenmodell** von `string[]` auf `Player { name, color }` umgestellt | [src/lib/stores/players.svelte.ts](../../lib/stores/players.svelte.ts) | Jedes Spiel muss mit `Player`-Objekten arbeiten (`player.name`). Alte gespeicherte Listen werden beim Laden automatisch übernommen und bekommen der Reihe nach Farben. |
| **Spielerzahl an Farbanzahl gekoppelt** (`MAX_PLAYERS` = Anzahl Farben), weil jede Farbe nur einmal vergeben wird. In 0.2.0 waren es 12, seit 0.3.0 sind es 20. | [src/lib/stores/players.svelte.ts](../../lib/stores/players.svelte.ts) | gilt für alle Spiele |
| **Farbpalette** und `textColorOn()`, das je nach Hintergrund schwarze oder weiße Schrift wählt | [src/lib/colors.ts](../../lib/colors.ts) | wiederverwendbar überall, wo Spielerfarben vorkommen |
| Neue Komponenten **`ColorPalette`** und **`PlayerChip`** | [src/lib/components/](../../lib/components/) | `PlayerSetup` sowie alle Spiele, die Spieler anzeigen |
| **`PassAndReveal`**: Die Props `players` und das `secret`-Snippet erhalten jetzt `Player` statt `string`. | [src/lib/components/PassAndReveal.svelte](../../lib/components/PassAndReveal.svelte) | Das Herumreichen ist in allen Spielen automatisch farbig. |

### Spieler bearbeiten, 20 Farben (0.3.0)

| Änderung | Ort | Folge für die App |
|---|---|---|
| **Palette auf 20 Farben** erweitert, nach Farbton sortiert, Raster mit 5 Spalten | [src/lib/colors.ts](../../lib/colors.ts), [ColorPalette.svelte](../../lib/components/ColorPalette.svelte) | Maximal 20 Spieler in allen Spielen. Bestehende Farb-IDs sind gleich geblieben, gespeicherte Spieler behalten also ihre Farbe. |
| **Bearbeiten-Modus** in `PlayerSetup` für Name und Farbe | [src/lib/components/PlayerSetup.svelte](../../lib/components/PlayerSetup.svelte) | Alle Spiele, die `PlayerSetup` nutzen, bekommen das automatisch. Ein Spieler wird nur noch über seinen Index in der Liste identifiziert, nicht mehr über den Namen. |

### Spielerfarbe am Button, eindeutige Initialen (0.4.0)

| Änderung | Ort | Folge für die App |
|---|---|---|
| **`Button` hat eine optionale `color`-Prop** (Hex-Wert). Die Schriftfarbe wird über `textColorOn()` automatisch angepasst, Rahmen und Schatten heben den Button von gleichfarbigen Flächen ab. | [src/lib/components/Button.svelte](../../lib/components/Button.svelte) | Jeder Button in jedem Spiel kann jetzt in einer Spielerfarbe erscheinen. |
| **`uniqueInitials()`** berechnet eindeutige Initialen für die ganze Spielerliste. | [src/lib/initials.ts](../../lib/initials.ts) | `PlayerSetup` und `ColorPalette` (vergebene Farben). Wird ein Spieler entfernt oder umbenannt, können sich die Initialen der Spieler nach ihm ändern. |

### Bilder-Modus (0.5.0)

| Änderung | Ort | Folge für die App |
|---|---|---|
| **Neue Komponente `PlayerAvatar`**: Farbkreis mit Initialen in zwei Größen (`sm`, `lg`). Aus `PlayerSetup` herausgelöst. | [src/lib/components/PlayerAvatar.svelte](../../lib/components/PlayerAvatar.svelte) | `PlayerSetup`, `PassAndReveal`, Imposter. Für alle Spiele wiederverwendbar. |
| **`PassAndReveal` zeigt den Avatar und 👁️** auf dem Weitergeben-Screen. Die Initialen berechnet die Komponente selbst aus der übergebenen Spielerliste. | [src/lib/components/PassAndReveal.svelte](../../lib/components/PassAndReveal.svelte) | Das gilt automatisch in allen Spielen, die herumgereicht werden. |
| Bundle-Größe | – | +1,6 KB gzip (jetzt ca. 31 KB JS). Emoji sind Text und funktionieren offline. |

---

## Bekannte Einschränkungen

- **Zurück-Button bricht die Runde ohne Nachfrage ab.** Er führt aus jeder Spielphase zurück zu den Einstellungen.
- **Die laufende Runde wird nicht gespeichert.** Wird die App neu geladen oder von iOS beendet, ist die Runde weg.
- **Die Liste bereits gespielter Wörter** liegt nur im Arbeitsspeicher und beginnt nach jedem Neustart von vorn.
- **Signalton im Stummmodus:** Ist das iPhone stumm geschaltet, hört man den Signalton am Ende des Timers nicht.
- **Keine Vibration**, weil iOS die Vibration API nicht unterstützt.
- **Emoji sehen je nach Gerät anders aus.** Auf iOS und Android sind die Motive gut erkennbar. Auf alten Geräten können neuere Emoji wie 🪁, 🪥 oder 🪑 fehlen.
- **Höchstens 20 Spieler**, weil es 20 Farben gibt. Mehr Spieler brauchen mehr Farben in [colors.ts](../../lib/colors.ts).

## Ideen / Backlog

- [ ] Rückfrage beim Abbrechen einer laufenden Runde
- [ ] Punktezählung über mehrere Runden
- [ ] Imposter darf am Ende das Wort raten
- [ ] Eigene Wörter bzw. eigene Kategorien anlegen
- [ ] Variante: Der Imposter bekommt ein ähnliches Wort statt gar keinem
- [ ] Mehr Kategorien und Wörter
