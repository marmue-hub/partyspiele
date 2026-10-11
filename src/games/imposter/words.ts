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
