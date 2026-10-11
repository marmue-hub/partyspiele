export interface Category {
  id: string;
  label: string;
  words: string[];
}

export const categories: Category[] = [
  {
    id: 'essen',
    label: '🍕 Essen & Trinken',
    words: [
      'Pizza', 'Sushi', 'Döner', 'Spaghetti', 'Pommes', 'Schnitzel', 'Brezel', 'Croissant',
      'Pfannkuchen', 'Burger', 'Currywurst', 'Lasagne', 'Erdbeere', 'Wassermelone', 'Banane',
      'Popcorn', 'Schokolade', 'Eis', 'Käsefondue', 'Tacos', 'Kaffee', 'Bier', 'Glühwein',
      'Apfelstrudel', 'Rührei', 'Müsli', 'Knödel', 'Avocado', 'Zuckerwatte', 'Spargel',
    ],
  },
  {
    id: 'orte',
    label: '📍 Orte',
    words: [
      'Strand', 'Flughafen', 'Krankenhaus', 'Schule', 'Kino', 'Supermarkt', 'Zoo', 'Bibliothek',
      'Freibad', 'Bahnhof', 'Kirche', 'Gefängnis', 'Fitnessstudio', 'Campingplatz', 'Museum',
      'Bäckerei', 'Zahnarztpraxis', 'Freizeitpark', 'Bauernhof', 'Weihnachtsmarkt', 'Skihütte',
      'Raumstation', 'U-Boot', 'Friseursalon', 'Tankstelle', 'Oktoberfest', 'Disco', 'Wüste',
    ],
  },
  {
    id: 'tiere',
    label: '🐘 Tiere',
    words: [
      'Elefant', 'Giraffe', 'Pinguin', 'Hai', 'Katze', 'Hund', 'Kuh', 'Delfin', 'Löwe', 'Känguru',
      'Eichhörnchen', 'Krokodil', 'Flamingo', 'Igel', 'Schildkröte', 'Biene', 'Spinne', 'Eule',
      'Faultier', 'Koala', 'Pferd', 'Papagei', 'Oktopus', 'Wolf', 'Schnecke', 'Panda', 'Kamel',
    ],
  },
  {
    id: 'berufe',
    label: '👩‍🚒 Berufe',
    words: [
      'Feuerwehrmann', 'Ärztin', 'Pilot', 'Lehrerin', 'Koch', 'Polizist', 'Friseurin', 'Astronaut',
      'Bäcker', 'Tierärztin', 'Zauberer', 'Gärtner', 'Detektiv', 'Klempner', 'Influencerin',
      'Richterin', 'Postbote', 'DJ', 'Bauarbeiter', 'Fußballprofi', 'Clown', 'Pirat', 'Bürgermeister',
    ],
  },
  {
    id: 'dinge',
    label: '🧸 Gegenstände',
    words: [
      'Regenschirm', 'Zahnbürste', 'Handy', 'Brille', 'Schlüssel', 'Kerze', 'Fernbedienung',
      'Kopfhörer', 'Toaster', 'Fahrrad', 'Rucksack', 'Spiegel', 'Wecker', 'Luftballon',
      'Staubsauger', 'Gitarre', 'Kühlschrank', 'Hängematte', 'Sonnenbrille', 'Teddybär',
      'Taschenlampe', 'Schere', 'Würfel', 'Trampolin', 'Bügeleisen', 'Kaktus',
    ],
  },
  {
    id: 'freizeit',
    label: '⚽ Sport & Freizeit',
    words: [
      'Fußball', 'Skifahren', 'Schwimmen', 'Bowling', 'Yoga', 'Angeln', 'Tennis', 'Karaoke',
      'Klettern', 'Surfen', 'Schach', 'Minigolf', 'Grillen', 'Tanzen', 'Zelten', 'Joggen',
      'Billard', 'Darts', 'Wandern', 'Escape Room', 'Puzzle', 'Videospiele', 'Reiten', 'Boxen',
    ],
  },
  {
    id: 'filme',
    label: '🎬 Filme & Figuren',
    words: [
      'Harry Potter', 'Spider-Man', 'Shrek', 'Batman', 'Darth Vader', 'Elsa', 'Pikachu',
      'Super Mario', 'James Bond', 'Pippi Langstrumpf', 'SpongeBob', 'Homer Simpson', 'Gollum',
      'Nemo', 'Hulk', 'Barbie', 'Sherlock Holmes', 'Dracula', 'Rapunzel', 'Yoda', 'Asterix',
      'Biene Maja', 'Der Grinch', 'Winnie Puuh',
    ],
  },
];

export interface PictureCategory {
  id: string;
  label: string;
  emoji: string;
  items: { emoji: string; word: string }[];
}

const items = (list: string) =>
  list
    .trim()
    .split('\n')
    .map((line) => {
      const [emoji, word] = line.trim().split(/\s+(.+)/);
      return { emoji, word };
    });

/** Picture mode: only motifs a non-reading child recognizes and names unambiguously. */
export const pictureCategories: PictureCategory[] = [
  {
    id: 'tiere',
    label: 'Tiere',
    emoji: '🐾',
    items: items(`
      🐶 Hund
      🐱 Katze
      🐭 Maus
      🐰 Hase
      🐻 Bär
      🐼 Panda
      🦁 Löwe
      🐯 Tiger
      🐮 Kuh
      🐷 Schwein
      🐸 Frosch
      🐵 Affe
      🐔 Huhn
      🐧 Pinguin
      🦆 Ente
      🦉 Eule
      🐴 Pferd
      🦄 Einhorn
      🐝 Biene
      🐌 Schnecke
      🦋 Schmetterling
      🐢 Schildkröte
      🐍 Schlange
      🐟 Fisch
      🐳 Wal
      🦈 Hai
      🐘 Elefant
      🦒 Giraffe
      🐊 Krokodil
    `),
  },
  {
    id: 'essen',
    label: 'Essen',
    emoji: '🍎',
    items: items(`
      🍎 Apfel
      🍌 Banane
      🍓 Erdbeere
      🍇 Weintrauben
      🍉 Wassermelone
      🍒 Kirschen
      🍋 Zitrone
      🍐 Birne
      🥕 Karotte
      🌽 Mais
      🍅 Tomate
      🍕 Pizza
      🍔 Burger
      🍟 Pommes
      🌭 Hotdog
      🍝 Nudeln
      🍞 Brot
      🧀 Käse
      🥚 Ei
      🍦 Eis
      🍰 Kuchen
      🍩 Donut
      🍪 Keks
      🍫 Schokolade
      🍭 Lutscher
      🥛 Milch
      🍿 Popcorn
    `),
  },
  {
    id: 'fahrzeuge',
    label: 'Fahrzeuge',
    emoji: '🚗',
    items: items(`
      🚗 Auto
      🚕 Taxi
      🚌 Bus
      🚓 Polizeiauto
      🚑 Krankenwagen
      🚒 Feuerwehrauto
      🚜 Traktor
      🚚 Lastwagen
      🏎️ Rennauto
      🏍️ Motorrad
      🚲 Fahrrad
      🛴 Roller
      🛹 Skateboard
      🚂 Zug
      🚁 Hubschrauber
      ✈️ Flugzeug
      🚀 Rakete
      ⛵ Segelboot
      🚢 Schiff
      🛸 UFO
      🚠 Seilbahn
    `),
  },
  {
    id: 'dinge',
    label: 'Dinge',
    emoji: '🧸',
    items: items(`
      ⚽ Ball
      🧸 Teddy
      🎈 Luftballon
      ☂️ Regenschirm
      🔑 Schlüssel
      📱 Handy
      ⏰ Wecker
      👓 Brille
      🎁 Geschenk
      🕯️ Kerze
      🔨 Hammer
      ✂️ Schere
      🖍️ Buntstift
      📚 Bücher
      🎸 Gitarre
      🥁 Trommel
      🪁 Drachen
      👑 Krone
      👟 Turnschuh
      🧦 Socken
      🪥 Zahnbürste
      🛁 Badewanne
      🪑 Stuhl
      🛏️ Bett
      💡 Glühbirne
      🔦 Taschenlampe
      📺 Fernseher
    `),
  },
  {
    id: 'natur',
    label: 'Natur & Wetter',
    emoji: '🌈',
    items: items(`
      ☀️ Sonne
      🌙 Mond
      ⭐ Stern
      🌈 Regenbogen
      ☁️ Wolke
      🌧️ Regen
      ⚡ Blitz
      ❄️ Schneeflocke
      ⛄ Schneemann
      🌳 Baum
      🌲 Tannenbaum
      🌻 Sonnenblume
      🌷 Tulpe
      🌵 Kaktus
      🍄 Pilz
      🍁 Blatt
      🌊 Welle
      🔥 Feuer
      🌋 Vulkan
      ⛰️ Berg
      🏝️ Insel
      🌍 Erde
    `),
  },
];
